import { CommandCtx } from '../../../types';
import { servicesEnum } from '../../../models/stream';

export default async function(args: string[], ctx: CommandCtx) {
  const [user, service = 'twitch'] = args;

  if (!user) {
    return ctx.message.reply('please inform the stream name!');
  }

  if (!servicesEnum.includes(service)) {
    return ctx.message.reply(
      `that is not a valid streaming site. Available: ${servicesEnum.join()}`
    );
  }

  await ctx.db.Stream.findOrCreate({ user, service });

  return ctx.message.channel.send(
    `Stream **${user}** added to the list of streamers!`
  );
}
