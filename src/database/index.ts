import { createConnection, Connection, Repository } from 'typeorm';
import config from '../config';

import { LolPlayer } from './entities/LolPlayer';
import { Stream } from './entities/Stream';

export type Database = {
  connection: Connection;
  LolPlayer: Repository<LolPlayer>;
  Stream: Repository<Stream>;
};

export async function startDatabase() {
  const connection = await createConnection({
    type: 'postgres',
    url: config.PG_URI,
    synchronize: true,
    entities: [LolPlayer, Stream],
  });

  return {
    connection,
    LolPlayer: connection.getRepository(LolPlayer),
    Stream: connection.getRepository(Stream),
  };
}
