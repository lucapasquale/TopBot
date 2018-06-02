import { equals } from 'ramda';
import { Client } from 'discord.js';

import { Database, Command } from '../types';
import { startCrons } from './crons';
import { getAllCommands } from './helpers';
import config from '../config';

const client = new Client();
const commands = getAllCommands(`${__dirname}/commands`);

export async function startClient(db: Database) {
  client.login(config.DISCORD_KEY);

  client.on('ready', async () => {
    console.log('Bot on!');

    await client.user.setActivity(`${config.CMD_PREFIX}help`);
    startCrons(client, db);
  });

  client.on('message', async (message) => {
    if (message.author.bot || message.content.charAt(0) !== config.CMD_PREFIX) {
      return;
    }

    const { command, args } = getCommandAndArgs(message.content);
    if (!command) return;

    try {
      await command.handler(args, { message, db, commands });
    } catch (error) {
      console.log('Error trying to execute command', {
        error,
        content: message.content,
        author: message.author,
      });
    }
  });
}

function getCommandAndArgs(content: string) {
  const cleanContent = content.trim().split(config.CMD_PREFIX)[1];
  const tags = cleanContent.split(' ');

  for (let l = tags.length; l >= 1; l -= 1) {
    const command = commands.find((cmd: Command) => {
      return equals(cmd.tag, tags.slice(0, l));
    });

    if (command) {
      return { command, args: tags.slice(l) };
    }
  }

  return { command: null, args: [] };
}
