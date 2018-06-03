import * as Discord from 'discord.js';
import { equals } from 'ramda';

import { Logger, Database, Command } from '../types';
import { startCrons } from './crons';
import { getAllCommands } from './helpers';
import config from '../config';

const client = new Discord.Client();
const commands = getAllCommands(`${__dirname}/commands`);

export async function startClient(logger: Logger, db: Database) {
  const baseCtx = { logger, db, commands };
  client.login(config.DISCORD_KEY);

  client.on('ready', async () => {
    console.log('Bot on!');

    await client.user.setActivity(`${config.CMD_PREFIX}help`);

    const channel = getDefaultTextChannel(client);
    startCrons({ ...baseCtx, channel });
  });

  client.on('message', async (message) => {
    if (message.author.bot || message.content.charAt(0) !== config.CMD_PREFIX) {
      return;
    }

    const { command, args } = getCommandAndArgs(message.content);
    if (!command) return;

    try {
      await command.handler(args, { ...baseCtx, message });
    } catch (error) {
      console.log('Error trying to execute command', {
        error,
        content: message.content,
        author: message.author,
      });
    }
  });
}

function getDefaultTextChannel(client: Discord.Client) {
  const channels = client.channels;
  const firstTextChannel = channels.filter((c: Discord.Channel) => c.type === 'text');
  return firstTextChannel.first() as Discord.TextChannel;
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
