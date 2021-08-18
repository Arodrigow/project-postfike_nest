import { HttpException, HttpStatus } from '@nestjs/common';

export class NotBookmarkOwnerException extends HttpException {
  constructor() {
    super('Action can only be made by bookmark owner', HttpStatus.BAD_REQUEST);
  }
}
