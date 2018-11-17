import { CommandCtx } from '../../../types';
import Stream from '../../../models/stream';
import { Args } from './schema';

export default async function(args: Args, ctx: CommandCtx) {
  const { streamName: name, service } = args;

  await ctx.db.Stream.findOrCreate<Stream>({ name, service });

  return ctx.message.channel.send(
    `Stream **${name}** added to the list of streams!`
  );
}
