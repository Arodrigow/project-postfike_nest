import { HttpException, HttpStatus } from '@nestjs/common';

export class BookmarkAlreadyExistException extends HttpException {
  constructor() {
    super('Bookmark already exist', HttpStatus.BAD_REQUEST);
  }
}
