import { Sequelize } from 'sequelize-typescript';
import config from '../config';

import { Streams } from '../models/Streams';
import { LolPlayer } from '../models/LolPlayer';


export type Db = {
  sequelize: Sequelize;
  Streams: typeof Streams;
  LolPlayer: typeof LolPlayer;
};

export async function startDB(): Promise<Db> {
  const sequelize = new Sequelize({
    url: config.PG_URI,
    logging: false,
    define: {
      timestamps: true,
      paranoid: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: 'deletedAt',
    },
  });

  sequelize.addModels([Streams, LolPlayer]);
  await sequelize.sync();

  return {
    sequelize,
    Streams,
    LolPlayer,
  };
}
