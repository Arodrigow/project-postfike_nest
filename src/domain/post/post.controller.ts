import { JwtAuthGuard } from './../../auth/jwt/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() createPostDto: CreatePostDto) {
    return await this.postService.create(req.user.userId, createPostDto);
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

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return await this.postService.update(req.user.userId, id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    return await this.postService.remove(req.user.userId, id);
  }

  // @Delete(':id/bookmark')
  // async deleteBookmark(@Param('id') postId: string) {
  //   //TODO: user must be logged in, so we have acces to its ID from JWT
  //   const userId = 'USER ID TAKEN FROM JWT';
  //   return await this.postService.deleteBookmark(postId, userId);
  // }
}
