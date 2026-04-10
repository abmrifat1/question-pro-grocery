import {
  Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany
} from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { OrderItem } from './order-item.entity';

@Table
export class Order extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  declare userId: string;

  @BelongsTo(() => User)
  declare user: User;

  @HasMany(() => OrderItem)
  declare items: OrderItem[];

  @Column(DataType.FLOAT)
  declare totalAmount: number;
}