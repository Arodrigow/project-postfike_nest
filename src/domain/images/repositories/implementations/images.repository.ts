import { Images } from './../../entities/images.entity';
import { Repository } from 'typeorm';
import { CreateImageDto } from '../../dto/create-image.dto';
import { IImagesRepository } from './../IImages.repository';
import { Inject } from '@nestjs/common';

export class ImagesRepository implements IImagesRepository {
  constructor(@Inject('IMAGE_REPOSITORY') private repo: Repository<Images>) {}

  async create(obj: CreateImageDto): Promise<void> {
    await this.repo.save(obj);
  }
}
