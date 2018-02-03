import * as Discord from 'discord.js';

import config from '../config';
import { Db, Command } from '../types';
import { startCrons } from '../cron-jobs';
import { getMessageAndArgs } from './helpers';


export async function startClient(db: Db, cmds: Command[]) {
  const client = new Discord.Client();
  client.login(config.DISCORD_KEY);

  client.on('ready', () => {
    console.log('Bot on!');
    startCrons(client, db);
  });

  client.on('message', async (message) => {
    const { command, args } = getMessageAndArgs(message.content, cmds);
    if (!command) {
      return;
    }

    const ctx = { message, db };
    await command.handler(args, ctx);
  });
}
