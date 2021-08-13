import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() obj: CreateUserDto) {
    return await this.userService.createUser(obj);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserProfile(@Param() params) {
    //Alreay have access to user's id or email through JWT, use it
    const id = params;
    return await this.userService.getUserProfile(id);
  }

  @Put(':id')
  async updateUser(@Param() params, @Body() obj: UpdateUserDto) {
    //Alreay have access to user's id or email through JWT, use it
    const id = params;
    return await this.userService.updateUser(id, obj);
  }

  @Delete(':id')
  async deleteUser(@Param() params) {
    //Alreay have access to user's id or email through JWT, use it
    const id = params;
    return await this.userService.deleteUser(id);
  }
}
