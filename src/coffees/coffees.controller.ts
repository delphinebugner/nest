import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return `This action returns all the coffees ! Limit: ${limit} and Offset : ${offset}`;
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action return coffee number ${id}`;
  }
  @Post()
  create(@Body() body: any): any {
    return body;
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `Update coffee number ${id}`;
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Delete coffee number ${id}`;
  }
}
