import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/helpers/jwt-auth.guard";
import { RolesGuard } from "../../common/middleware/roles.guard";
import { Roles } from "../../common/middleware/roles.decorator";
import { GroceryService } from "../services/grocery.service";
import { CreateGroceryDto, UpdateGroceryDto } from "../dto/grocery.dto";

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('grocery')
export class GroceryController {
  constructor(private service: GroceryService) { }

  @Post()
  @Roles('admin')
  create(@Body() dto: CreateGroceryDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('available')
  findAvailable() {
    return this.service.findAvailableItems();
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() dto: UpdateGroceryDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Patch(':id/inventory')
  @Roles('admin')
  updateInventory(@Param('id') id: string, @Body('inventory') inventory: number) {
    return this.service.updateInventory(id, inventory);
  }
}