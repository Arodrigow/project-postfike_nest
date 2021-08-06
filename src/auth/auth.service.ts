import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  auth(obj: AuthDto) {
    throw new Error('Method not implemented.');
  }
}
