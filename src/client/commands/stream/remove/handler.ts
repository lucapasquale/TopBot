import { CommandCtx } from '../../../../types';

export default async function (args: string[], ctx: CommandCtx) {
  const [token] = args;

  if (!token) {
    return ctx.message.reply('please inform a user!');
  }

  await ctx.db.Stream.delete({ token });
  return ctx.message.channel.send(`Stream **${token}** removed from list of streamers`);
}
