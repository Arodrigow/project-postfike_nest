import { UserService } from './../user/user.service';
import { TagService } from './../tag/tag.service';
import { TagsRepository } from './../tag/repositories/implementations/tag.repository';
import { tagProvider } from './../../providers/tag/tag.provider';
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
    PostRepository,
    ...postProvider,
    UserService,
    UserRepository,
    ...userProvider,
    TagService,
    TagsRepository,
    ...tagProvider,
    ...bookmarkProvider,
  ],
})
export class PostModule {}
