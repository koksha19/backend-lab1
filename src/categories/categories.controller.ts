import { Controller, Get, Post, Delete, Param, Query, Body, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CreateCategoryDto } from '../dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() dto: CreateCategoryDto, @Query('user_id') userId?: string) {
    if (userId) dto.userId = +userId;
    return this.categoryService.create(dto);
  }

  @Get()
  findAll(@Query('user_id') userId?: string) {
    if (userId) {
      return this.categoryService.findByUser(+userId);
    }
    return this.categoryService.findAll();
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }
}
