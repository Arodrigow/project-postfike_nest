import { createConnection, getConnectionOptions } from 'typeorm';

export const databaseProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (host = 'postgres') => {
      const defaultOptions = await getConnectionOptions();
      return await createConnection(
        Object.assign(defaultOptions, {
          host: process.env.NODE_ENV === ('dev' || 'test') ? 'localhost' : host,
          database:
            process.env.NODE_ENV === ('dev' || 'test')
              ? 'database.sqlite'
              : defaultOptions.database,
        }),
      );
    },
  },
];
