import {
  Table, Column, Model, DataType, ForeignKey, BelongsTo
} from 'sequelize-typescript';
import { GroceryItem } from '../grocery/grocery-item.entity';
import { Order } from './order.entity';

@Table
export class OrderItem extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @ForeignKey(() => Order)
  @Column(DataType.UUID)
  declare orderId: string;

  @ForeignKey(() => GroceryItem)
  @Column(DataType.UUID)
  declare groceryItemId: string;

  @BelongsTo(() => GroceryItem)
  declare groceryItem: GroceryItem;

  @Column(DataType.INTEGER)
  declare quantity: number;

  @Column(DataType.FLOAT)
  declare price: number;
}