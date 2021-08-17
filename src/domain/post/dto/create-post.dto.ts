import { Tag } from './../../tag/entities/tag.entity';

export class CreatePostDto {
  title: string;
  description: string;
  details?: string;
  expiration?: Date;
  tags?: Tag[];
}
