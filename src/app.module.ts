import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TagModule } from './tag/tag.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [PostModule, UserModule, AuthModule, TagModule, ImagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
