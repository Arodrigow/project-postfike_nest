import { AuthDto } from './dto/auth.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  authUser(@Body() obj: AuthDto) {
    return this.authService.auth(obj);
  }
}
