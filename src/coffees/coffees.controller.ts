import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll() {
    return 'This action returns all the coffees !';
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action return coffee number ${id}`;
  }
  @Post()
  create(@Body() body: any): any {
    return body;
  }
}
