import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../../entities/user.entity';
import { IUserRepository } from '../IUser.repository';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@Inject('USER_REPOSITORY') private repo: Repository<User>) {}

  async createUser(obj: CreateUserDto): Promise<void> {
    const user = this.repo.create(obj);
    await this.repo.save(user);
  }

  async findUserProfile(id: string): Promise<User> {
    const user = await this.repo.findOne(id);
    return user;
  }

  async updateUserProfile(id: string, obj: UpdateUserDto): Promise<void> {
    await this.repo.update(id, obj);
  }

  async deleteUser(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
