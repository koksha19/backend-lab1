import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from '../dto/category.dto';
import { BadRequestCustomException } from "../exceptions/bad-request.exception";
import { NotFoundCustomException } from "../exceptions/not-found.exception";

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCategoryDto) {
    const isGlobal = !dto.userId;

    if (!dto.name) {
      throw new BadRequestCustomException('Category name is required');
    }

    try {
      return this.prisma.category.create({
        data: {
          name: dto.name,
          isGlobal,
          userId: dto.userId ?? null,
        },
      });
    } catch (error) {
      throw new BadRequestCustomException('Failed to create category');
    }
  }

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findByUser(userId: number) {
    if (!userId) {
      throw new BadRequestCustomException('User ID is required');
    }

    return this.prisma.category.findMany({
      where: {
        OR: [
          { isGlobal: true },
          { userId },
        ],
      },
    });
  }

  async remove(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundCustomException('Category not found');
    return this.prisma.category.delete({ where: { id } });
  }
}
