import { Client } from 'discord.js';

import { Logger, Database } from '../../types';
import { getAllCommands } from './helpers';
import config from '../../config';
import onReady from './on-ready';
import onMessage from './on-message';

export async function startClient(log: Logger, db: Database) {
  const client = new Client();
  client.login(config.DISCORD_KEY);

  const commands = getAllCommands(`${__dirname}/../../commands`);
  const ctx = { client, log, db, commands };

  client.on('ready', async () => {
    await onReady(ctx);
  });

  client.on('message', async message => {
    await onMessage(message, ctx);
  });

  client.on('error', async error => {
    log.error('Client error!', {
      message: error.message,
      stack: error.stack,
    });
  });
}
