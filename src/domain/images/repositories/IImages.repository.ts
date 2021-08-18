import { Images } from './../entities/images.entity';
import { CreateImageDto } from './../dto/create-image.dto';

export interface IImagesRepository {
  create(obj: CreateImageDto): Promise<void>;
  delete(id: string): Promise<void>;
  find(id: string): Promise<Images>;
}
