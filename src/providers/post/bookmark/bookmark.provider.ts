import { Connection } from 'typeorm';
import { Bookmark } from '../../../domain/post/entities/bookmark.entity';

export const bookmarkProvider = [
  {
    provide: 'BOOKMARK_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Bookmark),
    inject: ['DATABASE_CONNECTION'],
  },
];
