import { createLogger } from './common/logger';
import { startDatabase } from './common/database';
import { startClient } from './common/client';

start();

async function start() {
  const logger = createLogger();
  const db = await startDatabase();

  await startClient(logger, db);
}
