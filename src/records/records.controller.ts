import { Controller, Get, Post, Delete, Param, Query, Body, ParseIntPipe, UseGuards } from "@nestjs/common";
import { RecordService } from './records.service';
import { CreateRecordDto } from '../dto/record.dto';
import { JwtAuthGuard } from "../guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  create(@Body() dto: CreateRecordDto) {
    return this.recordService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recordService.findOne(id);
  }

  @Get()
  findFiltered(
    @Query('user_id') userId?: string,
    @Query('category_id') categoryId?: string,
  ) {
    return this.recordService.findFiltered(
      userId ? +userId : undefined,
      categoryId ? +categoryId : undefined,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.recordService.remove(id);
  }
}

