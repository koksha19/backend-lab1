import { HttpStatus } from '@nestjs/common';
import { BaseCustomException } from './base.exception';

export class BadRequestCustomException extends BaseCustomException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
