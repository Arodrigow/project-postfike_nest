import { HttpException, HttpStatus } from '@nestjs/common';

export class TagNotFoundException extends HttpException {
  constructor() {
    super('Tag not found.', HttpStatus.BAD_REQUEST);
  }
}
