import { Post } from './../../post/entities/post.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('images')
export class Images {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  url: string;
  @Column()
  key: string;

  @ManyToOne(() => Post, (post) => post.images)
  post: Post;

  constructor() {
    if (this.id) {
      this.id = uuidV4();
    }
  }
}
