import { Injectable, NotFoundException } from '@nestjs/common';

export type RecordItem = {
  id: number;
  userId: number;
  categoryId: number;
  createdAt: string;
  amount: number;
};

@Injectable()
export class RecordsService {
  private records: RecordItem[] = [];
  private nextId = 1;

  create(userId: number, categoryId: number, amount: number) {
    const record: RecordItem = {
      id: this.nextId++,
      userId,
      categoryId,
      createdAt: new Date().toISOString(),
      amount,
    };
    this.records.push(record);

    return record;
  }

  findOne(id: number) {
    const record = this.records.find(record => record.id === id);

    if (!record) {
      throw new NotFoundException('Record not found');
    }

    return record;
  }

  remove(id: number) {
    const index = this.records.findIndex(record => record.id === id);

    if (index === -1) {
      throw new NotFoundException('Record not found');
    }

    this.records.splice(index, 1);
  }

  find(userId?: number, categoryId?: number) {
    return this.records.filter(record => {
      if (userId && categoryId) {
        return record.userId === userId && record.categoryId === categoryId;
      }

      if (userId) {
        return record.userId === userId;
      }

      if (categoryId) {
        return record.categoryId === categoryId;
      }

      return false;
    });
  }
}

