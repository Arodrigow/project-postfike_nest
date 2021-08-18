import { DataIntegrityException } from './../../../../shared/errors/dataIntegrity.exception';
import { TagNotFoundException } from './../../../../shared/errors/tagNotFound.exception';
import { TagAlreadyExistException } from './../../../../shared/errors/tagAlreadyExist.exception';
import { Inject, Injectable } from '@nestjs/common';
import { CreateTagDto } from '../../dto/create-tag.dto';
import { Tag } from '../../entities/tag.entity';
import { Repository } from 'typeorm';
import { ITagRepository } from '../ITag.repository';

@Injectable()
export class TagsRepository implements ITagRepository {
  constructor(@Inject('TAG_REPOSITORY') private repo: Repository<Tag>) {}

  async create(obj: CreateTagDto): Promise<void> {
    const tag = await this.repo.findOne({ title: obj.title });
    if (tag) {
      throw new TagAlreadyExistException();
    }
    const newTag = this.repo.create(obj);
    newTag.posts = [];
    await this.repo.save(newTag);
  }

  async findTag(id: string): Promise<Tag> {
    const foundTag = await this.repo.findOne(id, { relations: ['posts'] });
    if (!foundTag) {
      throw new TagNotFoundException();
    }
    return foundTag;
  }

  async findAllTags(): Promise<Tag[]> {
    return await this.repo.find();
  }

  async delete(id: string): Promise<void> {
    const tag = await this.findTag(id);
    if (tag.posts.length >= 1) {
      throw new DataIntegrityException();
    }
    await this.repo.delete(id);
  }
}
