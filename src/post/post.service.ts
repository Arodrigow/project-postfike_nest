import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  addView(postId: string, userId: string) {
    throw new Error('Method not implemented.');
  }

  addBookmark(postId: string, userId: string) {
    throw new Error('Method not implemented.');
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: string) {
    return `This action returns a #${id} post`;
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: string) {
    return `This action removes a #${id} post`;
  }

  deleteView(postId: string, userId: string) {
    throw new Error('Method not implemented.');
  }

  deleteBookmark(postId: string, userId: string) {
    throw new Error('Method not implemented.');
  }
}
