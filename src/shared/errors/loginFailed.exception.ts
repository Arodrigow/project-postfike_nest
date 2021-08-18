import { HttpException, HttpStatus } from '@nestjs/common';

export class LoginFailedException extends HttpException {
  constructor() {
    super('Incorrect email or password', HttpStatus.UNAUTHORIZED);
  }
}
