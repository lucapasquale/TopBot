import { createConnection, Connection } from 'typeorm';
import config from '../config';

import { LolPlayerRepository, StreamRepository } from './extension';

export type Database = {
  connection: Connection;
  LolPlayer: LolPlayerRepository;
  Stream: StreamRepository;
};

export async function startDatabase() {
  const connection = await createConnection({
    type: 'postgres',
    url: config.PG_URI,
    synchronize: true,
    entities: [`${__dirname}/entities/*.js`],
  });

  const database = {
    connection,
    LolPlayer: connection.getCustomRepository(LolPlayerRepository),
    Stream: connection.getCustomRepository(StreamRepository),
  };

  initializeDatabase(database);
  return database;
}

async function initializeDatabase(db: Database) {
  await db.Stream.update({}, { online: false });
}
