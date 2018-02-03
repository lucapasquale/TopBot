import { Context } from '../../../types';


export default async function (args: string[], ctx: Context) {
  const [token] = args;
  if (!token) {
    await ctx.message.channel.send('Please inform a user!');
    return;
  }

  await ctx.db.Streams.destroy({ where: { token } });
  await ctx.message.channel.send(`Stream **${token}** removed from list of streamers`);
}
