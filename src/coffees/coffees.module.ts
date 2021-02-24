import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Event } from '../events/entities/event.entity';
import { Flavor } from './entities/flavor.entity';
import { COFFEE_BRANDS } from './coffee.constants';

@Injectable()
class CoffeeBrandFactory {
  create() {
    return ['Carrefour Bio', 'Nescafé'];
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  providers: [
    CoffeesService,
    CoffeeBrandFactory,
    {
      provide: COFFEE_BRANDS,
      useFactory: (coffeeBrandFactory: CoffeeBrandFactory) =>
        coffeeBrandFactory.create(),
      inject: [CoffeeBrandFactory],
    },
  ],
  controllers: [CoffeesController],
  exports: [CoffeesService],
})
export class CoffeesModule {}
