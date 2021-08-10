import { Tag } from '../../tag/entities/tag.entity';
import { Connection } from 'typeorm';

export const tagProvider = [
  {
    provide: 'TAG_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Tag),
    inject: ['DATABASE_CONNECTION'],
  },
];
