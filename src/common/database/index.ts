import 'reflect-metadata'
import { createConnection, Connection } from 'typeorm'
import SnakeNamingStrategy from './snake-name-strategy'
import config from '../../config'

import Stream from '../../models/stream'
import Player from '../../models/player'
import Game from '../../models/game'

export interface Database {
  connection: Connection
  Stream: typeof Stream
  Player: typeof Player
  Game: typeof Game
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
    Player,
    Game,
  }

  await initializeDatabase(database)
  return database
}

async function initializeDatabase(db: Database) {
  await db.Stream.update({}, { online: false })
}
