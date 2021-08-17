import { Images } from './../../domain/images/entities/images.entity';
import { Connection } from 'typeorm';

export const imagesProvider = [
  {
    provide: 'IMAGE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Images),
    inject: ['DATABASE_CONNECTION'],
  },
];
