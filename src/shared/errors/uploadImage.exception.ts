import { HttpException, HttpStatus } from '@nestjs/common';

export class UploadImageException extends HttpException {
  constructor() {
    super('Problem encountered during upload', HttpStatus.BAD_REQUEST);
  }
}
