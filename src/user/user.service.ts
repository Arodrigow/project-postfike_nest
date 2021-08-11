import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/implementations/user.repository';

@Injectable()
export class UserService {
  constructor(private repo: UserRepository) {}

  async createUser(obj: CreateUserDto): Promise<void> {
    await this.repo.createUser(obj);
  }

  async getUserProfile(id: string) {
    const userProfile = await this.repo.findUserProfile(id);
    return userProfile;
  }

  async updateUser(id: string, obj: UpdateUserDto): Promise<void> {
    await this.repo.updateUserProfile(id, obj);
  }

  async deleteUser(id: string): Promise<void> {
    await this.repo.deleteUser(id);
  }
}
