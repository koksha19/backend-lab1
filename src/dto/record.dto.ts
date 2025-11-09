import { IsInt, IsNumber } from 'class-validator';

export class CreateRecordDto {
  @IsInt()
  userId: number;

  @IsInt()
  categoryId: number;

  @IsNumber()
  amount: number;
}

