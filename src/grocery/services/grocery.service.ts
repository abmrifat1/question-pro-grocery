import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GroceryItem } from '../../common/entity/grocery/grocery-item.entity';

@Injectable()
export class GroceryService {
  constructor(
    @InjectModel(GroceryItem)
    private readonly groceryItem: typeof GroceryItem
  ) { }
}