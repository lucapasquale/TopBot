import { CommandCtx } from '../../../types';

export default async function(args: string[], ctx: CommandCtx) {
  const [user] = args;

  if (!user) {
    return ctx.message.reply('please inform a stream!');
  }

  await ctx.db.Stream.delete({ user });
  return ctx.message.channel.send(
    `Stream **${user}** removed from list of streamers`
  );
}
