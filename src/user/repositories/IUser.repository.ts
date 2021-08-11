import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export interface IUserRepository {
  createUser(obj: CreateUserDto): Promise<void>;
  findUserProfile(id: string): Promise<User>;
  updateUserProfile(id: string, obj: UpdateUserDto): Promise<void>;
  deleteUser(id: string): Promise<void>;
}
