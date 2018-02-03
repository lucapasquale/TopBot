import * as Discord from 'discord.js';

import config from '../config';
import { Db, Command } from '../types';
import { startCrons } from '../crons';
import { parseCommandText, getDefaultChannels } from './helpers';


export async function startClient(db: Db, cmds: Command[]) {
  const client = new Discord.Client();
  client.login(config.DISCORD_KEY);


  client.on('ready', () => {
    console.log('Bot on!');

    const defaultChannels = getDefaultChannels(client.channels.array());
    startCrons(defaultChannels.text, db);
  });

  client.on('message', async (message) => {
    const { command, args } = parseMessage(message.content, cmds);
    if (!command) {
      return;
    }

    const ctx = { message, db };
    await command.handler(args, ctx);
  });
}


function parseMessage(message: string, commands: Command[]) {
  if (message.charAt(0) !== '$') {
    return { command: null, args: [] };
  }

  return parseCommandText(message, commands);
}
