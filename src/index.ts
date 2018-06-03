import * as pino from 'pino';
import { startDatabase } from './database';
import { startClient } from './client';

start();

async function start() {
  const logger = pino();
  const db = await startDatabase();

  await startClient(logger, db);
}
