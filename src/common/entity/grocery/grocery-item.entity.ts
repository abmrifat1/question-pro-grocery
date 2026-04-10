import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class GroceryItem extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column
  declare name: string;

  @Column(DataType.FLOAT)
  declare price: number;

  @Column(DataType.INTEGER)
  declare inventory: number;
}