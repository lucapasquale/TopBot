import { Client } from 'discord.js';

import config from '../config';
import { Database } from '../types';
import { getAllCommands, getMessageAndArgs } from './helpers';

const client = new Client();
const cmds = getAllCommands(`${__dirname}/commands`);

export async function startClient(db: Database) {
  client.login(config.DISCORD_KEY);

  client.on('ready', async () => {
    console.log('Bot on!');
    await client.user.setActivity('$help');

    // startCrons(client, db);
  });

  client.on('message', async (message) => {
    const { command, args } = getMessageAndArgs(message.content, cmds);
    if (!command) {
      return;
    }

    try {
      await command.handler(args, { message, db });
    } catch (error) {
      console.log('Error trying to execute command', { message, error });
    }
  });
}