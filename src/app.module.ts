import { Module } from '@nestjs/common';
import { PostModule } from './domain/post/post.module';
import { UserModule } from './domain/user/user.module';
import { AuthModule } from './auth/auth.module';
import { TagModule } from './domain/tag/tag.module';
import { ImagesModule } from './domain/images/images.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    PostModule,
    UserModule,
    AuthModule,
    TagModule,
    ImagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
