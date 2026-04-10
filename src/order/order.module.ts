import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GroceryService } from '../grocery/services/grocery.service';
import { Order } from '../common/entity/orders/order.entity';
import { OrderItem } from '../common/entity/orders/order-item.entity';
import { GroceryItem } from '../common/entity/grocery/grocery-item.entity';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Order, OrderItem, GroceryItem]),
  ],
  controllers: [OrderController],
  providers: [OrderService, GroceryService],
  exports: [OrderService],
})
export class OrderModule {}