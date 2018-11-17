import * as Discord from 'discord.js';
import * as Joi from 'joi';
import * as R from 'ramda';

import { Context, Command } from '../../types';
import config from '../../config';

export default async function(message: Discord.Message, ctx: Context) {
  const { content, author } = message;

  if (author.bot || content.charAt(0) !== config.CMD_PREFIX) {
    return;
  }

  const { command, args } = getCommandAndArgs(ctx, content);
  if (!command) {
    return;
  }

  const { error, value } = validateArgs(command, args);
  if (error) {
    return sendJoiErrorMessage(message, error);
  }

  try {
    ctx.log.debug('executing command', {
      content,
      author: author.username,
    });
    await command.handler(value, { ...ctx, message });
  } catch (error) {
    ctx.log.error('failed to execute command', {
      content,
      author: author.username,
      error: {
        message: error.message,
        stack: error.stack,
      },
    });
  }
}

function getCommandAndArgs(ctx: Context, content: string) {
  const cleanContent = content.trim().split(config.CMD_PREFIX)[1];
  const tags = cleanContent.split(' ');

  for (let l = tags.length; l >= 1; l -= 1) {
    const command = ctx.commands.find(cmd => {
      return R.equals(cmd.tag, tags.slice(0, l));
    });

    if (command) {
      return { command, args: tags.slice(l) };
    }
  }

  return { command: null, args: [] };
}

function validateArgs(command: Command, args: string[]) {
  const argsObject = command.validation.args.reduce((obj, key, i) => {
    return { ...obj, [key]: args[i] };
  }, {});

  return Joi.validate(argsObject, command.validation.schema || Joi.any());
}

function sendJoiErrorMessage(
  message: Discord.Message,
  error: Joi.ValidationError
) {
  const details = error.details[0];
  return message.reply(`Invalid options for command:\n${details.message}`);
}
