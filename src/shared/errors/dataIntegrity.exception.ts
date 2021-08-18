import { HttpException, HttpStatus } from '@nestjs/common';

export class DataIntegrityException extends HttpException {
  constructor() {
    super(
      'Cannot delete entity due to data integrity concerns.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
