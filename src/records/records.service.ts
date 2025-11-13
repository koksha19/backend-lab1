import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecordDto } from '../dto/record.dto';
import { NotFoundCustomException } from "../exceptions/not-found.exception";
import { BadRequestCustomException } from "../exceptions/bad-request.exception";

@Injectable()
export class RecordService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRecordDto) {
    const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });
    if (!user) throw new NotFoundCustomException('User', dto.userId);

    const category = await this.prisma.category.findUnique({ where: { id: dto.categoryId } });
    if (!category) throw new NotFoundCustomException('Category', dto.categoryId);

    try {
      return await this.prisma.record.create({ data: dto });
    } catch (error) {
      throw new BadRequestCustomException('Failed to create record');
    }
  }

  async findOne(id: number) {
    const record = await this.prisma.record.findUnique({ where: { id } });
    if (!record) throw new NotFoundCustomException('Record', id);

    return record;
  }

  async findFiltered(userId?: number, categoryId?: number) {
    if (!userId && !categoryId) {
      throw new BadRequestCustomException('You must provide user_id or category_id');
    }

    return this.prisma.record.findMany({
      where: {
        ...(userId && { userId }),
        ...(categoryId && { categoryId }),
      },
    });
  }

  async remove(id: number) {
    const record = await this.prisma.record.findUnique({ where: { id } });
    if (!record) throw new NotFoundCustomException('Record', id);

    await this.prisma.record.delete({ where: { id } });
    return { message: `Record with id=${id} deleted successfully` };
  }
}
