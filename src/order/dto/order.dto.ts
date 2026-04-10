import { IsArray, IsNotEmpty, IsNumber, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @IsUUID()
  @IsNotEmpty()
  groceryItemId?: string;

  @IsNumber()
  @IsNotEmpty()
  quantity?: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items?: OrderItemDto[];
}

export class OrderResponseDto {
  id?: string;
  userId?: string;
  totalAmount?: number;
  items?: OrderItemResponseDto[];
  createdAt?: Date;
}

export class OrderItemResponseDto {
  id?: string;
  groceryItemId?: string;
  name?: string;
  quantity?: number;
  price?: number;
  subtotal?: number;
}