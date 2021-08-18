import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistException extends HttpException {
  constructor() {
    super('Email already in use.', HttpStatus.BAD_REQUEST);
  }
}
