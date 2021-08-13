import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../entities/post.entity';

export interface IPostRepository {
  createPost(obj: CreatePostDto): Promise<void>;
  createBookmark(postId: string, userId: string): Promise<void>;
  findPost(id: string): Promise<Post>;
  findAll(): Promise<Post[]>;
  updatePost(id: string, obj: UpdatePostDto): Promise<void>;
  deletePost(id: string): Promise<void>;
  deleteBookmark(postId: string): Promise<void>;
}
