import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { User } from './common/entity/users/user.entity';
import { GroceryItem } from './common/entity/grocery/grocery-item.entity';
import { Order } from './common/entity/orders/order.entity';
import { OrderItem } from './common/entity/orders/order-item.entity';
import { OrderModule } from './order/order.module';
import { GroceryModule } from './grocery/grocery.module';

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
    AuthModule,
    GroceryModule,
    OrderModule,
  ],
})
export class AppModule { }