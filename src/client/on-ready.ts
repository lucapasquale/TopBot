import * as Discord from 'discord.js';
import * as later from 'later';

import { BaseContext, Cronjob, CronCtx } from '../types';
import cronjobs from './cronjobs';
import config from '../config';

export default async function (client: Discord.Client, baseCtx: BaseContext) {
  await client.user.setActivity(`${config.CMD_PREFIX}help`);

  const channel = getDefaultTextChannel(client);
  startCrons(baseCtx, channel);

  baseCtx.log.info('Bot ready!');
}

function getDefaultTextChannel(client: Discord.Client) {
  const channels = client.channels;
  const firstTextChannel = channels.filter((c: Discord.Channel) => c.type === 'text');
  return firstTextChannel.first() as Discord.TextChannel;
}

function startCrons(baseCtx: BaseContext, channel: Discord.TextChannel) {
  cronjobs.forEach((cj) => {
    const ctx = { ...baseCtx, channel };
    later.setInterval(() => runCron(cj, ctx), later.parse.text(cj.interval));
  });
}

async function runCron(cronJob: Cronjob, ctx: CronCtx) {
  try {
    await cronJob.handler(ctx);
  }
  catch (error) {
    ctx.log.error('failed to execute cronjob', {
      cronJob,
      error: {
        message: error.message,
        stack: error.stack,
      },
    });
  }
}
