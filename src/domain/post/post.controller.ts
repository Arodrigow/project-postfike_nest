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
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() createPostDto: CreatePostDto) {
    return await this.postService.create(req.user.userId, createPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/bookmark')
  async addBookmark(@Request() req, @Param('id') postId: string) {
    const userId = req.user.userId;
    return await this.postService.addBookmark(postId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/images')
  @UseInterceptors(FilesInterceptor('files', 6))
  async addImages(
    @Request() req,
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Param('id') postId: string,
  ) {
    return await this.postService.addImages(req.user.userId, postId, images);
  }

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

  @UseGuards(JwtAuthGuard)
  @Delete(':id/images/:imgId')
  async removeImage(@Request() req, @Param() param) {
    return await this.postService.deleteImage(
      req.user.userId,
      param.id,
      param.imgId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/bookmark')
  async deleteBookmark(@Request() req, @Param('id') postId: string) {
    const userId = req.user.userId;
    return await this.postService.deleteBookmark(postId, userId);
  }
}
