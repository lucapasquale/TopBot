import { createConnection, Connection } from 'typeorm';
import config from '../config';

import { StreamRepository } from './entity/stream';
import { LolPlayerRepository } from './entity/lol-player';

export interface Database {
  connection: Connection;
  Stream: StreamRepository;
  LolPlayer: LolPlayerRepository;
};

export async function startDatabase() {
  const connection = await createConnection({
    type: 'postgres',
    url: config.PG_URI,
    synchronize: config.ENV === 'test',
    entities: [`${__dirname}/entity/*.{js,ts}`],
  });

  const database = {
    connection,
    Stream: connection.getCustomRepository(StreamRepository),
    LolPlayer: connection.getCustomRepository(LolPlayerRepository),
  };

  await initializeDatabase(database);
  return database;
}

async function initializeDatabase(db: Database) {
  await db.Stream.update({}, { online: false });
}
