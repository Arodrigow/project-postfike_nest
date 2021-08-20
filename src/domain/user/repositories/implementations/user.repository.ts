import { DataIntegrityException } from './../../../../shared/errors/dataIntegrity.exception';
import { UserNotFoundException } from './../../../../shared/errors/userNotFound.exception';
import { UserAlreadyExistException } from './../../../../shared/errors/userAlreadyExist.exception';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../../entities/user.entity';
import { IUserRepository } from '../IUser.repository';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@Inject('USER_REPOSITORY') private repo: Repository<User>) {}

  async createUser(obj: CreateUserDto): Promise<void> {
    const userExist = await this.findUserByEmail(obj.email);
    if (userExist) {
      throw new UserAlreadyExistException();
    }
    const user = this.repo.create(obj);
    await this.repo.save(user);
  }

  async findUserProfile(id: string): Promise<User> {
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new UserNotFoundException();
    }
    const { password, ...userReturn } = user;
    return userReturn;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.repo.findOne({ email });
    return user;
  }
  async updateUserProfile(id: string, obj: UpdateUserDto): Promise<void> {
    await this.findUserProfile(id);
    await this.repo.update(id, obj);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.repo.findOne(id, { relations: ['posts'] });
    if (!user) {
      throw new UserNotFoundException();
    }
    if (user.posts.length >= 1) {
      throw new DataIntegrityException();
    }
    await this.repo.delete(id);
  }
}
