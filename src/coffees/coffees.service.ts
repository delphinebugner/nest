import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  // mock
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Arabica',
      brand: 'Nespresso',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll(): Coffee[] {
    return this.coffees;
  }

  findOne(id: string): Coffee {
    return this.coffees.find((coffee) => `${coffee.id}` === id);
  }

  create(newCoffee: Coffee): void {
    this.coffees.push(newCoffee);
  }

  update(id: string, updateCoffeeDto: any): void {
    const oldCoffeeIndex = this.coffees.findIndex(
      (coffee) => `${coffee.id}` === id,
    );
    if (oldCoffeeIndex > 0) {
      const oldCoffee = this.findOne(id);
      const newCoffee = { ...oldCoffee, ...updateCoffeeDto };
      this.coffees.splice(oldCoffeeIndex, 1, newCoffee);
    }
  }

  remove(id: string): void {
    const coffeeToDeleteIndex = this.coffees.findIndex(
      (coffee) => `${coffee.id}` === id,
    );
    if (coffeeToDeleteIndex > 0) {
      this.coffees.splice(coffeeToDeleteIndex, 1);
    }
  }
}
