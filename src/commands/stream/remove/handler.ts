import { CommandCtx } from '../../../types';
import { Args } from './schema';

export default async function(args: Args, ctx: CommandCtx) {
  const { streamName: name } = args;

  await ctx.db.Stream.delete({ name });

  return ctx.message.channel.send(
    `Stream **${name}** removed from list of streamers`
  );
}
