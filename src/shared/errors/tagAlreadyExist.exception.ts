import { HttpException, HttpStatus } from '@nestjs/common';

export class TagAlreadyExistException extends HttpException {
  constructor() {
    super('Tag already exist', HttpStatus.BAD_REQUEST);
  }
}
