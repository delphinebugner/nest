import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
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

  findOne(id: string) {
    const coffee = this.coffees.find((coffee) => `${coffee.id}` === id);
    if (!coffee) {
      throw new NotFoundException(`Coffee number ${id} not found`);
    }
    return coffee;
  }

  private findIndex(id: string): number {
    return this.coffees.findIndex((coffee) => `${coffee.id}` === id);
  }

  create(newCoffeeDto: CreateCoffeeDto): void {
    this.coffees.push({ ...newCoffeeDto, id: this.coffees.length });
  }

  update(id: string, updateCoffeeDto: any): void {
    const oldCoffeeIndex = this.findIndex(id);
    if (oldCoffeeIndex >= 0) {
      const oldCoffee = this.findOne(id);
      const newCoffee = { ...oldCoffee, ...updateCoffeeDto };
      this.coffees.splice(oldCoffeeIndex, 1, newCoffee);
    }
  }

  remove(id: string): void {
    const coffeeToDeleteIndex = this.findIndex(id);
    if (coffeeToDeleteIndex >= 0) {
      this.coffees.splice(coffeeToDeleteIndex, 1);
    }
  }
}
