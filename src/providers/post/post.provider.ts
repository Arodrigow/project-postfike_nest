import { Connection } from 'typeorm';
import { Post } from '../../domain/post/entities/post.entity';

export const postProvider = [
  {
    provide: 'POST_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Post),
    inject: ['DATABASE_CONNECTION'],
  },
];
