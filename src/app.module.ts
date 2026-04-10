import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entity/users/user.entity';
import { GroceryItem } from './entity/grocery/grocery-item.entity';
import { Order } from './entity/orders/order.entity';
import { OrderItem } from './entity/orders/order-item.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.getOrThrow<string>('DB_HOST'),
        port: parseInt(configService.getOrThrow<string>('DB_PORT'), 10),
        username: configService.getOrThrow<string>('DB_USERNAME'),
        password: configService.getOrThrow<string>('DB_PASSWORD'),
        database: configService.getOrThrow<string>('DB_DATABASE'),
        autoLoadModels: true,
        synchronize: true,
        logging: console.log,
        models: [User, GroceryItem, Order, OrderItem],
      }),
    }),
    AuthModule
  ],
})
export class AppModule { }