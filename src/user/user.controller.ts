import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() obj: CreateUserDto) {
    return this.userService.createUser(obj);
  }

  @Get()
  getUserProfile() {
    //Alreay have access to user's id or email through JWT, use it
    const email = 'email.from@jwt.com';
    return this.userService.getUserProfile(email);
  }

  @Put()
  updateUser(@Body() obj: UpdateUserDto) {
    //Alreay have access to user's id or email through JWT, use it
    const email = 'email.from@jwt.com';
    return this.userService.updateUser(email, obj);
  }

  @Delete()
  deleteUser() {
    //Alreay have access to user's id or email through JWT, use it
    const email = 'email.from@jwt.com';
    return this.userService.deleteUser(email);
  }
}
