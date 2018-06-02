import { Context } from '../../../../types';

export default async function (_: string[], ctx: Context) {
  const { id, username } = ctx.message.author;

  await ctx.db.LolPlayer.upsert({ userId: id }, { username });

  await ctx.message.channel.send(`Player **${username}** added to the list of LoL players!`);
}
