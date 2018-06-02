import { Context } from '../../../../types';

export default async function (args: string[], ctx: Context) {
  const [token] = args;

  if (!token) {
    return ctx.message.reply('please inform a user!');
  }

  await ctx.db.Stream.delete({ token });
  return ctx.message.channel.send(`Stream **${token}** removed from list of streamers`);
}
