import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('images')
export class Images {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  url: string;
  @Column()
  key: string;

  constructor() {
    if (this.id) {
      this.id = uuidV4();
    }
  }
}
