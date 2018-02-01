import { Sequelize } from 'sequelize-typescript';
import config from '../config';

import { Streams } from '../models/Streams';


export type Db = {
  sequelize: Sequelize,
  Streams: typeof Streams,
};

export function startDB(): Db {
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

  sequelize.addModels([Streams]);

  return {
    sequelize,
    Streams,
  };
}
