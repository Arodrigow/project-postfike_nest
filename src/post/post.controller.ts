import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Post(':id/bookmark')
  addBookmark(@Param('id') postId: string) {
    //TODO: user must be logged in, so we have acces to its ID from JWT
    const userId = 'USER ID TAKEN FROM JWT';
    return this.postService.addBookmark(postId, userId);
  }

  @Post(':id/view')
  addView(@Param('id') postId: string) {
    //TODO: user must be logged in, so we have acces to its ID from JWT
    const userId = 'USER ID TAKEN FROM JWT';
    return this.postService.addView(postId, userId);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }

  @Delete(':id/bookmark')
  deleteBookmark(@Param('id') postId: string) {
    //TODO: user must be logged in, so we have acces to its ID from JWT
    const userId = 'USER ID TAKEN FROM JWT';
    return this.postService.deleteBookmark(postId, userId);
  }

  @Delete(':id/bookmark')
  deleteView(@Param('id') postId: string) {
    //TODO: user must be logged in, so we have acces to its ID from JWT
    const userId = 'USER ID TAKEN FROM JWT';
    return this.postService.deleteView(postId, userId);
  }
}
