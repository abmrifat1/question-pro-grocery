import {
  Table, Column, Model, DataType, HasMany
} from 'sequelize-typescript';
import { Order } from '../orders/order.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Table
export class User extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({ unique: true })
  declare username: string;

  @Column
  declare password: string;

  @Column({
    type: DataType.ENUM('admin', 'user'),
  })
  declare role: UserRole;

  @HasMany(() => Order)
  declare orders: Order[];
}