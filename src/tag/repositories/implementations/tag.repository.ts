import { Inject, Injectable } from '@nestjs/common';
import { CreateTagDto } from '../../dto/create-tag.dto';
import { Tag } from '../../entities/tag.entity';
import { Repository } from 'typeorm';
import { ITagRepository } from '../ITag.repository';

@Injectable()
export class TagsRepository implements ITagRepository {
  constructor(@Inject('TAG_REPOSITORY') private repo: Repository<Tag>) {}

  async create(obj: CreateTagDto): Promise<void> {
    const newTag = this.repo.create(obj);
    await this.repo.save(newTag);
  }

  async findTag(id: string): Promise<Tag> {
    const foundTag = await this.repo.findOne(id);
    return foundTag;
  }

  async findAllTags(): Promise<Tag[]> {
    return await this.repo.find();
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
