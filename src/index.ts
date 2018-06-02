import { startDatabase } from './database';
import { startClient } from './client';

start();

async function start() {
  const db = await startDatabase();
  await startClient(db);
}
