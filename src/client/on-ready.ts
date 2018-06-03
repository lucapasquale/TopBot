import * as Discord from 'discord.js';
import * as later from 'later';

import { BaseContext } from '../types';
import cronjobs from './cronjobs';
import config from '../config';

export default async function (client: Discord.Client, baseCtx: BaseContext) {
  await client.user.setActivity(`${config.CMD_PREFIX}help`);

  const channel = getDefaultTextChannel(client);
  startCrons(baseCtx, channel);

  baseCtx.logger.info('Bot ready!');
}

function getDefaultTextChannel(client: Discord.Client) {
  const channels = client.channels;
  const firstTextChannel = channels.filter((c: Discord.Channel) => c.type === 'text');
  return firstTextChannel.first() as Discord.TextChannel;
}

function startCrons(ctx: BaseContext, channel: Discord.TextChannel) {
  cronjobs.map((cj) => {
    later.setInterval(() => {
      try {
        cj.handler({ ...ctx, channel });
      } catch (error) {
        console.log('Error trying to execute cronjob', {
          error,
          cronjob: cj,
        });
      }
    },                later.parse.text(cj.interval));
  });
}
