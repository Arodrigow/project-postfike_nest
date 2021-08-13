import { UserRepository } from '../../../user/repositories/implementations/user.repository';
import { User } from '../../../user/entities/user.entity';
import { Bookmark } from '../../entities/bookmark.entity';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../../dto/create-post.dto';
import { UpdatePostDto } from '../../dto/update-post.dto';
import { Post } from '../../entities/post.entity';
import { IPostRepository } from '../IPost.repository';

@Injectable()
export class PostRepository implements IPostRepository {
  constructor(
    @Inject('POST_REPOSITORY') private repo: Repository<Post>,
    @Inject('BOOKMARK_REPOSITORY') private bookmarkRepo: Repository<Bookmark>,
    private userRepo: UserRepository,
  ) {}

  async createPost(id: string, obj: CreatePostDto): Promise<void> {
    const createdPost = this.repo.create(obj);
    const user = await this.userRepo.findUserProfile(id);
    createdPost.user = user;
    await this.repo.save(createdPost);
  }

  async createBookmark(postId: string, userId: string): Promise<void> {
    const post = await this.findPost(postId);
    const user = await this.userRepo.findUserProfile(userId);

    const createdBookmark = this.bookmarkRepo.create({ post, user });
    await this.bookmarkRepo.save(createdBookmark);
  }

  async findPost(id: string): Promise<Post> {
    const foundPost = await this.repo.findOne(id, { relations: ['user'] });
    return foundPost;
  }

  async findAll(): Promise<Post[]> {
    return await this.repo.find({ relations: ['user'] });
  }

  async updatePost(
    userId: string,
    id: string,
    obj: UpdatePostDto,
  ): Promise<void> {
    await this.isPostOwner(userId, id);
    await this.repo.update(id, obj);
  }

  async deletePost(userId: string, id: string): Promise<void> {
    await this.isPostOwner(userId, id);
    await this.repo.delete(id);
  }

  async deleteBookmark(postId: string): Promise<void> {
    //REVIEW THIS PART
    this.bookmarkRepo
      .createQueryBuilder('bm')
      .delete()
      .where('bm.post.id = postId');
  }

  private async isPostOwner(userId: string, postId: string): Promise<void> {
    const post = await this.findPost(postId);

    if (post.user.id !== userId) {
      throw new UnauthorizedException();
    }
  }
}
