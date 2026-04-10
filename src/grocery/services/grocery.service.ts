import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateGroceryDto, UpdateGroceryDto } from '../dto/grocery.dto';
import { GroceryItem } from '../../common/entity/grocery/grocery-item.entity';

@Injectable()
export class GroceryService {
  constructor(
    @InjectModel(GroceryItem)
    private groceryModel: typeof GroceryItem,
  ) { }

  async create(dto: CreateGroceryDto): Promise<GroceryItem> {
    const existingItem = await this.groceryModel.findOne({
      where: { name: dto.name }
    });

    if (existingItem) {
      throw new ConflictException(`Grocery item with name "${dto.name}" already exists`);
    }

    const grocery = await this.groceryModel.create({
      name: dto.name,
      price: dto.price,
      inventory: dto.inventory || 0,
    });

    return grocery;
  }

  async findAll(): Promise<GroceryItem[]> {
    return await this.groceryModel.findAll({
      order: [['createdAt', 'DESC']]
    });
  }

  async findAvailableItems(): Promise<GroceryItem[]> {
    return await this.groceryModel.findAll({
      where: {
        inventory: { [require('sequelize').Op.gt]: 0 }
      },
      order: [['createdAt', 'DESC']]
    });
  }

  async findOne(id: string): Promise<GroceryItem> {
    try {
      const grocery = await this.groceryModel.findByPk(id);
      if (!grocery) {
        throw new NotFoundException(`Grocery item with ID ${id} not found`);
      }
      return grocery;
    } catch (error) {
      throw new NotFoundException(`Grocery item with ID ${id} not found`);
    }
  }

  async update(id: string, dto: UpdateGroceryDto): Promise<GroceryItem> {
    const grocery = await this.findOne(id);

    if (dto.name && dto.name !== grocery.name) {
      const existingItem = await this.groceryModel.findOne({
        where: { name: dto.name }
      });

      if (existingItem) {
        throw new ConflictException(`Grocery item with name "${dto.name}" already exists`);
      }
    }

    await grocery.update({
      name: dto.name || grocery.name,
      price: dto.price || grocery.price,
      inventory: dto.inventory !== undefined ? dto.inventory : grocery.inventory,
    });

    return grocery;
  }

  async updateInventory(id: string, inventory: number): Promise<GroceryItem> {
    if (inventory < 0) {
      throw new ConflictException('Inventory cannot be negative');
    }

    const grocery = await this.findOne(id);
    await grocery.update({ inventory });

    return grocery;
  }

  async remove(id: string): Promise<{ message: string }> {
    const grocery = await this.findOne(id);
    await grocery.destroy();

    return { message: `Grocery item "${grocery.name}" deleted successfully` };
  }

  async checkAndUpdateStock(id: string, quantity: number): Promise<boolean> {
    const grocery = await this.findOne(id);

    if (grocery.inventory < quantity) {
      throw new ConflictException(`Insufficient stock for ${grocery.name}. Available: ${grocery.inventory}`);
    }

    await grocery.update({ inventory: grocery.inventory - quantity });

    return true;
  }
}