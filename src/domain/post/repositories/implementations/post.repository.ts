import { NotBookmarkOwnerException } from './../../../../shared/errors/NotBookmarkOwner.exception copy';
import { BookmarkNotFoundException } from './../../../../shared/errors/bookmarkNotFound.exception';
import { NotPostOwnerException } from './../../../../shared/errors/NotPostOwner.exception';
import { PostNotFoundException } from './../../../../shared/errors/postNotFound.exception';
import { BookmarkAlreadyExistException } from './../../../../shared/errors/bookmarkAlreadyExist.exception';
import { ImagesService } from './../../../images/images.service';
import { UserService } from './../../../user/user.service';
import { Bookmark } from '../../entities/bookmark.entity';
import { Inject, Injectable } from '@nestjs/common';
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
    private userService: UserService,
    private imagesService: ImagesService,
  ) {}

  async createPost(id: string, obj: CreatePostDto): Promise<void> {
    const createdPost = this.repo.create(obj);
    const user = await this.userService.getUserProfile(id);

    createdPost.user = user;
    await this.repo.save(createdPost);
  }

  async createBookmark(postId: string, userId: string): Promise<void> {
    const bmExists = await this.bookmarkAlreadyExists(userId, postId);
    if (bmExists) {
      throw new BookmarkAlreadyExistException();
    }
    const post = await this.findPost(postId);
    const user = await this.userService.getUserProfile(userId);

    const createdBookmark = this.bookmarkRepo.create({ post, user });
    await this.bookmarkRepo.save(createdBookmark);
    post.count_bookmark++;
    await this.repo.save(post);
  }

  async addImages(
    userId: string,
    postId: string,
    images: Express.Multer.File[],
  ): Promise<void> {
    const post = await this.isPostOwner(userId, postId);
    const imgs = await this.imagesService.uploadImages(images);
    post.images = imgs;
    await this.repo.save(post);
  }

  async findPost(id: string): Promise<Post> {
    const foundPost = await this.repo.findOne(id, {
      relations: ['user', 'tags', 'images', 'bookmarks'],
    });
    if (!foundPost) {
      throw new PostNotFoundException();
    }
    const { password, ...user } = foundPost.user;
    foundPost.user = user;
    return foundPost;
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.repo.find({ relations: ['user', 'tags'] });
    for (const x in posts) {
      const { password, ...user } = posts[x].user;
      posts[x].user = user;
    }

    return posts;
  }

  async updatePost(
    userId: string,
    id: string,
    obj: UpdatePostDto,
  ): Promise<void> {
    const post = await this.isPostOwner(userId, id);
    Object.assign(post, obj);
    await this.repo.save(post);
  }

  async deletePost(userId: string, id: string): Promise<void> {
    const post = await this.isPostOwner(userId, id);
    await this.ifImagesExist(post);
    await this.ifBookmarkExist(post);
    await this.repo.delete(id);
  }

  async deleteBookmark(userId: string, postId: string): Promise<void> {
    const bm = await this.bookmarkAlreadyExists(userId, postId);
    if (!bm) {
      throw new BookmarkNotFoundException();
    }
    if (bm.user.id !== userId) {
      throw new NotBookmarkOwnerException();
    }

    const post = await this.findPost(postId);

    await this.bookmarkRepo.delete(bm.id);
    post.count_bookmark--;
    await this.repo.save(post);
  }

  async deleteImage(
    userId: string,
    postId: string,
    imageId: string,
  ): Promise<void> {
    await this.isPostOwner(userId, postId);
    await this.imagesService.deleteImage(imageId);
  }

  private async isPostOwner(userId: string, postId: string): Promise<Post> {
    const post = await this.findPost(postId);

    if (post.user.id !== userId) {
      throw new NotPostOwnerException();
    }
    return post;
  }

  private async bookmarkAlreadyExists(
    userId: string,
    postId: string,
  ): Promise<Bookmark> {
    const bm = await this.bookmarkRepo.findOne(
      { post: { id: postId }, user: { id: userId } },
      { relations: ['user'] },
    );

    if (!bm) {
      return null;
    }
    return bm;
  }

  private async ifImagesExist(post: Post) {
    if (post.images.length >= 1) {
      for (const x in post.images) {
        await this.imagesService.deleteImage(post.images[x].id);
      }
    }
  }
  private async ifBookmarkExist(post: Post) {
    if (post.bookmarks.length >= 1) {
      for (const x in post.bookmarks)
        await this.bookmarkRepo.delete(post.bookmarks[x].id);
    }
  }
}
