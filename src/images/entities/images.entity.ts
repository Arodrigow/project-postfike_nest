import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity()
export class Images {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  path: string;

  constructor() {
    if (this.id) {
      this.id = uuidV4();
    }
  }
}
