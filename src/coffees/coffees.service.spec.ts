import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('CoffeesService', () => {
  let service: CoffeesService;
  let coffeeRepo: MockRepository<Coffee>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository<Flavor>(),
        },
        { provide: Connection, useValue: {} },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    coffeeRepo = module.get<MockRepository>(getRepositoryToken(Coffee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when coffee exists', () => {
      it('should return the coffee object', async () => {
        const coffeeId = '1';
        const expectedCoffee = {};
        coffeeRepo.findOne.mockReturnValue(expectedCoffee);
        const coffee = await coffeeRepo.findOne(coffeeId);
        expect(coffee).toEqual(expectedCoffee);
      });
    });
    describe('when coffee does not exist', () => {
      it('should return a not found Exception', async () => {
        const coffeeId = '1';
        try {
          coffeeRepo.findOne.mockReturnValue(undefined);
          await coffeeRepo.findOne(coffeeId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Coffee number ${coffeeId} not found`);
        }
      });
    });
  });
});
