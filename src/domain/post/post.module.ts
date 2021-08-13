import { UserRepository } from '../user/repositories/implementations/user.repository';
import { bookmarkProvider } from '../../providers/post/bookmark/bookmark.provider';
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { DatabaseModule } from '../../providers/database/database.module';
import { postProvider } from '../../providers/post/post.provider';
import { PostRepository } from './repositories/implementations/post.repository';
import { userProvider } from '../../providers/user/user.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [PostController],
  providers: [
    PostService,
    ...postProvider,
    ...bookmarkProvider,
    ...userProvider,
    PostRepository,
    UserRepository,
  ],
})
export class PostModule {}
