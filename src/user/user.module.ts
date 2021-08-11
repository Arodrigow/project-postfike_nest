import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../providers/database/database.module';
import { userProvider } from '../providers/user/user.provider';
import { UserRepository } from './repositories/implementations/user.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userProvider, UserRepository],
})
export class UserModule {}
