import { Controller, Post, Get, Body, Request, UseGuards, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/helpers/jwt-auth.guard';
import { RolesGuard } from '../../common/middleware/roles.guard';
import { Roles } from '../../common/middleware/roles.decorator';
import { CreateOrderDto } from '../dto/order.dto';
import { OrderService } from '../services/order.service';

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrderController {
  constructor(private orderService: OrderService) { }

  @Post()
  @Roles('user')
  async createOrder(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    const userId = req.user.userId;
    return this.orderService.createOrder(userId, createOrderDto);
  }

  @Get()
  @Roles('user')
  async getMyOrders(@Request() req) {
    const userId = req.user.userId;
    return this.orderService.getUserOrders(userId);
  }

  @Get(':id')
  @Roles('user')
  async getOrderDetails(@Request() req, @Param('id') id: string) {
    const userId = req.user.userId;
    return this.orderService.getOrderDetails(id, userId);
  }
}