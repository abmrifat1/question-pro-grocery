import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CreateOrderDto, OrderResponseDto, OrderItemResponseDto } from '../dto/order.dto';
import { GroceryService } from '../../grocery/services/grocery.service';
import { Order } from '../../common/entity/orders/order.entity';
import { OrderItem } from '../../common/entity/orders/order-item.entity';
import { GroceryItem } from '../../common/entity/grocery/grocery-item.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
    @InjectModel(OrderItem)
    private orderItemModel: typeof OrderItem,
    private groceryService: GroceryService,
    private sequelize: Sequelize,
  ) { }

  async createOrder(userId: string, payload: CreateOrderDto): Promise<OrderResponseDto> {
    const transaction = await this.sequelize.transaction();

    try {
      let totalAmount = 0;
      const orderItems: OrderItemResponseDto[] = [];

      const order = await this.orderModel.create({
        userId,
        totalAmount: 0,
      }, { transaction });

      if (payload?.items && payload?.items?.length > 0) {

        for (const item of payload?.items) {
          if (item.groceryItemId && item.quantity) {
            const grocery = await this.groceryService.findOne(item.groceryItemId);
            if (!grocery) {
              throw new NotFoundException(`Grocery item with ID ${item.groceryItemId} not found`);
            }
            await this.groceryService.checkAndUpdateStock(item.groceryItemId, item.quantity);

            const subtotal = grocery.price * item.quantity;
            totalAmount += subtotal;

            const orderItem = await this.orderItemModel.create({
              orderId: order.id,
              groceryItemId: item.groceryItemId,
              quantity: item.quantity,
              price: grocery.price,
            }, { transaction });

            orderItems.push({
              id: orderItem.id,
              groceryItemId: grocery.id,
              name: grocery.name,
              quantity: item.quantity,
              price: grocery.price,
              subtotal: subtotal,
            });
          } else {
            throw new ConflictException(`Please add item and quantity`);
          }
        }
      } else {
        throw new ConflictException(`Order have no any item please add a item`);
      }

      await order.update({ totalAmount }, { transaction });

      await transaction.commit();

      return {
        id: order.id,
        userId: order.userId,
        totalAmount: totalAmount,
        items: orderItems,
        createdAt: order.createdAt,
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getUserOrders(userId: string): Promise<OrderResponseDto[]> {
    const orders = await this.orderModel.findAll({
      where: { userId },
      include: [
        {
          model: OrderItem,
          include: [GroceryItem],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return orders.map(order => this.formatOrderResponse(order));
  }

  async getOrderDetails(orderId: string, userId: string): Promise<OrderResponseDto> {
    const order = await this.orderModel.findOne({
      where: { id: orderId, userId },
      include: [
        {
          model: OrderItem,
          include: [GroceryItem],
        },
      ],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    return this.formatOrderResponse(order);
  }

  private formatOrderResponse(order: Order): OrderResponseDto {
    const items: OrderItemResponseDto[] = order.items.map(item => ({
      id: item.id,
      groceryItemId: item.groceryItemId,
      name: item.groceryItem?.name || 'Unknown Item',
      quantity: item.quantity,
      price: item.price,
      subtotal: item.price * item.quantity,
    }));

    return {
      id: order.id,
      userId: order.userId,
      totalAmount: order.totalAmount,
      items: items,
      createdAt: order.createdAt,
    };
  }
}