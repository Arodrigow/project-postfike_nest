import { DatabaseModule } from './../providers/database/database.module';
import { UserRepository } from './../user/repositories/implementations/user.repository';
import { LocalStrategy } from './local.strategy';
import { UserService } from './../user/user.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { userProvider } from '../providers/user/user.provider';

@Module({
  imports: [PassportModule, DatabaseModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    UserRepository,
    ...userProvider,
    LocalStrategy,
  ],
})
export class AuthModule {}
