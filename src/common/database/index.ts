import 'reflect-metadata'
import { createConnection, Connection } from 'typeorm'
import SnakeNamingStrategy from './snake-name-strategy'
import config from '../../config'

import Stream from '../../models/stream'
import LolPlayer from '../../models/lol-player'

export type Database = {
  connection: Connection
  Stream: typeof Stream
  LolPlayer: typeof LolPlayer
}

export async function startDatabase() {
  const connection = await createConnection({
    type: 'postgres',
    url: config.PG_URI,
    namingStrategy: new SnakeNamingStrategy(),
    entities: [`${__dirname}/../../models/*.{js,ts}`],
  })

  const database = {
    connection,
    Stream,
    LolPlayer,
  }

  await initializeDatabase(database)
  return database
}

async function initializeDatabase(db: Database) {
  await db.Stream.update({}, { online: false })
}
