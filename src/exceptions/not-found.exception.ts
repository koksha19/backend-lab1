import { HttpStatus } from '@nestjs/common';
import { BaseCustomException } from './base.exception';

export class NotFoundCustomException extends BaseCustomException {
  constructor(resource: string, id?: number | string) {
    super(
      `${resource}${id ? ` with id=${id}` : ''} not found`,
      HttpStatus.NOT_FOUND,
    );
  }
}