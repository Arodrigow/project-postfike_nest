import { HttpException, HttpStatus } from '@nestjs/common';

export class BookmarkNotFoundException extends HttpException {
  constructor() {
    super('Bookmark not found.', HttpStatus.NOT_FOUND);
  }
}
