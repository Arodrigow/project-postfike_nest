import { HttpException, HttpStatus } from '@nestjs/common';

export class ImageNotFoundException extends HttpException {
  constructor() {
    super('Image was not found', HttpStatus.NOT_FOUND);
  }
}
