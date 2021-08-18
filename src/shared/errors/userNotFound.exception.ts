import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super('User was not found.', HttpStatus.NOT_FOUND);
  }
}
