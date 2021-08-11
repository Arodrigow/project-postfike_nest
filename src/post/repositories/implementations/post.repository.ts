import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../../dto/create-post.dto';
import { UpdatePostDto } from '../../dto/update-post.dto';
import { Post } from '../../entities/post.entity';
import { IPostRepository } from '../IPost.repository';

@Injectable()
export class PostRepository implements IPostRepository {
  constructor(@Inject('POST_REPOSITORY') private repo: Repository<Post>) {}

  async createPost(obj: CreatePostDto): Promise<void> {
    const createdPost = this.repo.create(obj);
    await this.repo.save(createdPost);
  }

  async findPost(id: string): Promise<Post> {
    const foundPost = await this.repo.findOne(id);
    return foundPost;
  }
  async findAll(): Promise<Post[]> {
    return await this.repo.find();
  }

  async updatePost(id: string, obj: UpdatePostDto): Promise<void> {
    await this.repo.update(id, obj);
  }
  async deletePost(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
