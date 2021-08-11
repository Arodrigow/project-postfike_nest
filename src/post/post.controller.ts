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
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postService.create(createPostDto);
  }

  // @Post(':id/bookmark')
  // async addBookmark(@Param('id') postId: string) {
  //   //TODO: user must be logged in, so we have acces to its ID from JWT
  //   const userId = 'USER ID TAKEN FROM JWT';
  //   return await this.postService.addBookmark(postId, userId);
  // }

  // @Post(':id/view')
  // async addView(@Param('id') postId: string) {
  //   //TODO: user must be logged in, so we have acces to its ID from JWT
  //   const userId = 'USER ID TAKEN FROM JWT';
  //   return await this.postService.addView(postId, userId);
  // }

  @Get()
  async findAll() {
    return await this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.postService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.postService.remove(id);
  }

  // @Delete(':id/bookmark')
  // async deleteBookmark(@Param('id') postId: string) {
  //   //TODO: user must be logged in, so we have acces to its ID from JWT
  //   const userId = 'USER ID TAKEN FROM JWT';
  //   return await this.postService.deleteBookmark(postId, userId);
  // }
}
