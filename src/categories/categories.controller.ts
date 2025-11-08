import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CategoriesService } from './categories.service';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('category')
  create(@Body('name') name: string) {
    return this.categoriesService.create(name);
  }

  @Get('category')
  findAll() {
    return this.categoriesService.findAll();
  }

  @Delete('category')
  remove(@Param('id') id: string) {
    this.categoriesService.remove(Number(id));
    return { success: true };
  }
}
