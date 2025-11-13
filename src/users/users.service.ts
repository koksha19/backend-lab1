import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '../dto/user.dto';
import { BadRequestCustomException } from "../exceptions/bad-request.exception";
import { NotFoundCustomException } from "../exceptions/not-found.exception";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    if (!dto.name) {
      throw new BadRequestCustomException('User name and email are required');
    }

    try {
      return await this.prisma.user.create({ data: dto });
    } catch (error) {
      throw new BadRequestCustomException('Failed to create user');
    }
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundCustomException('User', id);
    return user;
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundCustomException('User', id);

    await this.prisma.user.delete({ where: { id } });
    return { message: `User with id=${id} deleted successfully` };
  }
}

