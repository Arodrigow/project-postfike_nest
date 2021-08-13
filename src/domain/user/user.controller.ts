import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() obj: CreateUserDto) {
    return await this.userService.createUser(obj);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserProfile(@Request() req) {
    //Alreay have access to user's id or email through JWT, use it
    const id = req.user.userId as string;
    return await this.userService.getUserProfile(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateUser(@Request() req, @Body() obj: UpdateUserDto) {
    //Alreay have access to user's id or email through JWT, use it
    const id = req.user.userId as string;
    return await this.userService.updateUser(id, obj);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteUser(@Request() req) {
    //Alreay have access to user's id or email through JWT, use it
    const id = req.user.userId as string;
    return await this.userService.deleteUser(id);
  }
}
