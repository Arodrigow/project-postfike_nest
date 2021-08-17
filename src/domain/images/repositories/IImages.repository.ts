import { CreateImageDto } from './../dto/create-image.dto';
export interface IImagesRepository {
  create(obj: CreateImageDto): Promise<void>;
}
