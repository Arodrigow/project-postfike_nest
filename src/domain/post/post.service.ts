import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './repositories/implementations/post.repository';

@Injectable()
export class PostService {
  constructor(private repo: PostRepository) {}

  async create(id: string, createPostDto: CreatePostDto) {
    return await this.repo.createPost(id, createPostDto);
  }

  async addBookmark(postId: string, userId: string) {
    return await this.repo.createBookmark(postId, userId);
  }

  async addImages(
    userId: string,
    postId: string,
    images: Express.Multer.File[],
  ) {
    return await this.repo.addImages(userId, postId, images);
  }

  async findAll() {
    return await this.repo.findAll();
  }

  async findOne(id: string) {
    return await this.repo.findPost(id);
  }

  async update(userId: string, id: string, updatePostDto: UpdatePostDto) {
    return await this.repo.updatePost(userId, id, updatePostDto);
  }

  async remove(userId: string, id: string) {
    return await this.repo.deletePost(userId, id);
  }

  async deleteBookmark(postId: string, userId: string) {
    await this.repo.deleteBookmark(userId, postId);
  }

  async deleteImage(userId: string, postId: string, imageId: string) {
    await this.repo.deleteImage(userId, postId, imageId);
  }
}
