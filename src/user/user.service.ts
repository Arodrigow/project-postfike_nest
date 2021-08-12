import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/implementations/user.repository';

@Injectable()
export class UserService {
  constructor(private repo: UserRepository) {}

  async createUser(obj: CreateUserDto): Promise<void> {
    const salt = await bcrypt.genSalt();
    obj.password = await bcrypt.hash(obj.password, salt);
    await this.repo.createUser(obj);
  }

  async getUserProfile(id: string): Promise<User> {
    const userProfile = await this.repo.findUserProfile(id);
    return userProfile;
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.repo.findUserByEmail(email);
  }

  async updateUser(id: string, obj: UpdateUserDto): Promise<void> {
    await this.repo.updateUserProfile(id, obj);
  }

  async deleteUser(id: string): Promise<void> {
    await this.repo.deleteUser(id);
  }
}
