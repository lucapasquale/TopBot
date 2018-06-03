import { createLogger } from './common/logger';
import { startDatabase } from './database';
import { startClient } from './client';

start();

async function start() {
  const logger = createLogger();
  const db = await startDatabase();

  await startClient(logger, db);
}
