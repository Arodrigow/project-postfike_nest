import { User } from './../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Bookmark } from './bookmark.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  count_bookmark: number;

  @Column({ nullable: true })
  count_view: number;

  @Column({ nullable: true })
  details: string;

  @Column({ nullable: true })
  expiration: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.post)
  bookmarks: Bookmark[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
    if (!this.expiration) {
      this.expiration = new Date();
      this.expiration.setDate(this.expiration.getDate() + 7);
    }

    this.count_bookmark = 0;
    this.count_view = 0;
  }
}
