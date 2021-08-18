import { HttpException, HttpStatus } from '@nestjs/common';

export class TagNotFoundException extends HttpException {
  constructor() {
    super('Tag not found.', HttpStatus.NOT_FOUND);
  }
}
