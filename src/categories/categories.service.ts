import { Injectable, NotFoundException } from '@nestjs/common';

export type Category = { id: number; name: string };

@Injectable()
export class CategoriesService {
  private categories: Category[] = [];
  private nextId = 1;

  create(name: string): Category {
    const category = { id: this.nextId++, name };
    this.categories.push(category);

    return category;
  }

  findAll(): Category[] {
    return this.categories;
  }

  remove(id: number): void {
    const index = this.categories.findIndex(category => category.id === id);

    if (index === -1) {
      throw new NotFoundException('Category not found');
    }

    this.categories.splice(index, 1);
  }

  findOne(id: number): Category {
    const category = this.categories.find(category => category.id === id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
}
