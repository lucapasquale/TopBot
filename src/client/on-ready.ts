import * as Discord from 'discord.js';

import { BaseContext } from '../types';
import { startCrons } from './crons';
import config from '../config';

export default async function (client: Discord.Client, ctx: BaseContext) {
  ctx.logger.info('Bot ready!');

  await client.user.setActivity(`${config.CMD_PREFIX}help`);

  const channel = getDefaultTextChannel(client);
  startCrons({ ...ctx, channel });
}

function getDefaultTextChannel(client: Discord.Client) {
  const channels = client.channels;
  const firstTextChannel = channels.filter((c: Discord.Channel) => c.type === 'text');
  return firstTextChannel.first() as Discord.TextChannel;
}
