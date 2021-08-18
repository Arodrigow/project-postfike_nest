import { HttpException, HttpStatus } from '@nestjs/common';

export class NotPostOwnerException extends HttpException {
  constructor() {
    super('Action can only be made by post owner', HttpStatus.BAD_REQUEST);
  }
}
