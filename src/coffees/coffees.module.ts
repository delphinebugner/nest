import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';

@Module({
  providers: [CoffeesService],
  controllers: [CoffeesController],
  exports: [CoffeesService],
})
export class CoffeesModule {}
