import { JwtStrategy } from './jwt/jwt.strategy';
import { DatabaseModule } from './../providers/database/database.module';
import { UserRepository } from '../domain/user/repositories/implementations/user.repository';
import { LocalStrategy } from './local/local.strategy';
import { UserService } from '../domain/user/user.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { userProvider } from '../providers/user/user.provider';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWTConfigAsync } from './config/jwt.config';

@Module({
  imports: [
    PassportModule,
    DatabaseModule,
    JwtModule.registerAsync(JWTConfigAsync),
  ],
  controllers: [AuthController],
  providers: [
    ConfigService,
    AuthService,
    UserService,
    UserRepository,
    ...userProvider,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
