import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../entities/post.entity';

export interface IPostRepository {
  createPost(id: string, obj: CreatePostDto): Promise<void>;
  createBookmark(postId: string, userId: string): Promise<void>;
  addImages(
    userId: string,
    postId: string,
    images: Express.Multer.File[],
  ): Promise<void>;
  findPost(id: string): Promise<Post>;
  findAll(page: number);
  search(page: number, q: string);
  updatePost(userId: string, id: string, obj: UpdatePostDto): Promise<void>;
  deletePost(userId: string, id: string): Promise<void>;
  deleteBookmark(userId: string, postId: string): Promise<void>;
  deleteImage(userId: string, postId: string, imageId: string): Promise<void>;
}
