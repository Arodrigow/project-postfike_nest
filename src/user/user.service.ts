import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  createUser(obj: CreateUserDto) {
    throw new Error('Method not implemented.');
  }
  getUserProfile(email: string) {
    throw new Error('Method not implemented.');
  }
  updateUser(email: string, obj: UpdateUserDto) {
    throw new Error('Method not implemented.');
  }
  deleteUser(email: string) {
    throw new Error('Method not implemented.');
  }
}
