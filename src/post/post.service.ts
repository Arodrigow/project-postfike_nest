import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './repositories/implementations/post.repository';

@Injectable()
export class PostService {
  constructor(private repo: PostRepository) {}

  async create(createPostDto: CreatePostDto) {
    return await this.repo.createPost(createPostDto);
  }

  // async addView(postId: string, userId: string) {
  //   throw new Error('Method not implemented.');
  // }

  // async addBookmark(postId: string, userId: string) {
  //   throw new Error('Method not implemented.');
  // }

  async findAll() {
    return await this.repo.findAll();
  }

  async findOne(id: string) {
    return await this.repo.findPost(id);
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.repo.updatePost(id, updatePostDto);
  }

  async remove(id: string) {
    return await this.repo.deletePost(id);
  }

  // async deleteBookmark(postId: string, userId: string) {
  //   throw new Error('Method not implemented.');
  // }
}
