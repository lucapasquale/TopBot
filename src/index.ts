import * as Discord from 'discord.js';

import { startDB } from './common/db';
import { getAllCommands } from './common/helpers';
import { startClient } from './common/client';


start();

async function start() {
  const db = await startDB();
  const cmds = getAllCommands(`${__dirname}/cmds`);

  await startClient(db, cmds);
}
