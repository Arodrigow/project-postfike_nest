import { HttpException, HttpStatus } from '@nestjs/common';

export class DeleteImageException extends HttpException {
  constructor() {
    super('Problem encountered during deletion', HttpStatus.BAD_REQUEST);
  }
}
