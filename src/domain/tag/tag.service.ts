import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';
import { TagsRepository } from './repositories/implementations/tag.repository';

@Injectable()
export class TagService {
  constructor(private repository: TagsRepository) {}

  async create(createTagDto: CreateTagDto): Promise<void> {
    await this.repository.create(createTagDto);
  }

  async findAll(): Promise<Tag[]> {
    return await this.repository.findAllTags();
  }

  async findOne(id: string): Promise<Tag> {
    return await this.repository.findTag(id);
  }

  async remove(id: string): Promise<void> {
    return await this.repository.delete(id);
  }
}
