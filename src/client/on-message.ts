import * as Discord from 'discord.js';
import * as R from 'ramda';

import { BaseContext } from '../types';
import config from '../config';

export default async function (message: Discord.Message, baseCtx: BaseContext) {
  const { content, author } = message;

  if (author.bot || content.charAt(0) !== config.CMD_PREFIX) {
    return;
  }

  const { command, args } = getCommandAndArgs(baseCtx, content);
  if (!command) {
    return;
  }

  try {
    baseCtx.log.debug('executing command', { content, author: author.username });
    await command.handler(args, { ...baseCtx, message });
  }
  catch (error) {
    baseCtx.log.error('failed to execute command', {
      content,
      author: author.username,
      error: {
        message: error.message,
        stack: error.stack,
      },
    });
  }
}

function getCommandAndArgs(ctx: BaseContext, content: string) {
  const cleanContent = content.trim().split(config.CMD_PREFIX)[1];
  const tags = cleanContent.split(' ');

  for (let l = tags.length; l >= 1; l -= 1) {
    const command = ctx.commands.find((cmd) => {
      return R.equals(cmd.tag, tags.slice(0, l));
    });

    if (command) {
      return { command, args: tags.slice(l) };
    }
  }

  return { command: null, args: [] };
}
