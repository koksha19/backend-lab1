import { Body, Controller, Delete, Get, Post, Param, Query, BadRequestException } from '@nestjs/common';
import { RecordsService } from './records.service';

@Controller()
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post('record')
  create(@Body() body: { userId: number; categoryId: number; amount: number }) {
    const { userId, categoryId, amount } = body;

    return this.recordsService.create(Number(userId), Number(categoryId), Number(amount));
  }

  @Get('record/:id')
  getOne(@Param('id') id: string) {
    return this.recordsService.findOne(Number(id));
  }

  @Delete('record/:id')
  remove(@Param('id') id: string) {
    this.recordsService.remove(Number(id));

    return { success: true };
  }

  @Get('record')
  find(@Query('user_id') user_id: string, @Query('category_id') category_id: string) {
    if (!user_id && !category_id) {
      throw new BadRequestException('Provide user_id and/or category_id');
    }

    const userId = user_id ? Number(user_id) : undefined;
    const categoryId = category_id ? Number(category_id) : undefined;
    return this.recordsService.find(userId, categoryId);
  }
}
