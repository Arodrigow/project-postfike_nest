import { CreateTagDto } from '../dto/create-tag.dto';
import { Tag } from '../entities/tag.entity';

export interface ITagRepository {
  create(obj: CreateTagDto): Promise<void>;
  findTag(id: string): Promise<Tag>;
  findAllTags(): Promise<Tag[]>;
  delete(id: string): Promise<void>;
}
