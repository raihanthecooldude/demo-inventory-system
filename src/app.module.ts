import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ProductModule } from './product/product.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { AreaModule } from './area/area.module';
import { WarehouseProductListModule } from './warehouse-product-list/warehouse-product-list.module';
import { SearchModule } from './search/search.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ProductModule, WarehouseModule, AreaModule, WarehouseProductListModule, SearchModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
