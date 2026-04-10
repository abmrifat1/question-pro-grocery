import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GroceryController } from './controllers/grocery.controller';
import { GroceryService } from './services/grocery.service';
import { GroceryItem } from '../common/entity/grocery/grocery-item.entity';

@Module({
  imports: [SequelizeModule.forFeature([GroceryItem])],
  controllers: [GroceryController],
  providers: [GroceryService],
  exports: [GroceryService],
})
export class GroceryModule {}