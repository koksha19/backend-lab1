import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseCustomException extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(
      {
        statusCode: status,
        message,
      },
      status,
    );
  }
}
