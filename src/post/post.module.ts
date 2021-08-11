import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { DatabaseModule } from '../providers/database/database.module';
import { postProvider } from '../providers/post/post.provider';
import { PostRepository } from './repositories/implementations/post.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [PostController],
  providers: [PostService, ...postProvider, PostRepository],
})
export class PostModule {}
