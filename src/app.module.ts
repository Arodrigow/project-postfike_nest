import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PostModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
