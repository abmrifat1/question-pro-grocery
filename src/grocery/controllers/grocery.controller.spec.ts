import { Test, TestingModule } from '@nestjs/testing';
import { GroceryController } from './grocery.controller';
import { GroceryService } from '../services/grocery.service';

describe('GroceryController', () => {
  let controller: GroceryController;

  const mockService = {
    findAll: jest.fn().mockResolvedValue([
      { id: '1', name: 'Rice', price: 50, inventory: 100 },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroceryController],
      providers: [{ provide: GroceryService, useValue: mockService }],
    }).compile();

    controller = module.get<GroceryController>(GroceryController);
  });

  it('should return all grocery items', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([
      { id: '1', name: 'Rice', price: 50, inventory: 100 },
    ]);
    expect(mockService.findAll).toHaveBeenCalled();
  });
});