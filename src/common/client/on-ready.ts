import * as Discord from 'discord.js'
import * as later from 'later'

import { Context, Cronjob, CronCtx } from '../../types'
import cronjobs from '../../cronjobs'
import config from '../../config'

export default async function(ctx: Context) {
  await ctx.client.user.setActivity(`${config.CMD_PREFIX}help`)

  const channel = getDefaultTextChannel(ctx.client)
  startCrons(ctx, channel)

  ctx.log.info('Bot ready!')
}

function getDefaultTextChannel(client: Discord.Client) {
  const channels = client.channels
  const firstTextChannel = channels.filter(
    (c: Discord.Channel) => c.type === 'text'
  )
  return firstTextChannel.first() as Discord.TextChannel
}

function startCrons(ctx: Context, channel: Discord.TextChannel) {
  cronjobs.forEach(cj => {
    const cronCtx = { ...ctx, channel }
    later.setInterval(() => runCron(cj, cronCtx), later.parse.text(cj.interval))
  })
}

async function runCron(cronJob: Cronjob, ctx: CronCtx) {
  try {
    await cronJob.handler(ctx)
  } catch (error) {
    ctx.log.error('failed to execute cronjob', {
      cronJob,
      error: {
        message: error.message,
        stack: error.stack,
      },
    })
  }
}
