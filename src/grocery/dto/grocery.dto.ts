import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateGroceryDto {
  @IsString()
  @IsNotEmpty({ message: 'Grocery Name is required' })
  name?: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Grocery Price is required' })
  price?: number;

  @IsNumber()
  inventory?: number;
}

export class UpdateGroceryDto {
  @IsString()
  @IsNotEmpty({ message: 'Grocery Id is required' })
  id?: string;

  @IsString()
  name?: string;

  @IsNumber()
  price?: number;

  @IsNumber()
  inventory?: number;
}