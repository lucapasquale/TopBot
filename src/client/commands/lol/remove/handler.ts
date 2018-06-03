import { CommandCtx } from '../../../../types';

export default async function (_: string[], ctx: CommandCtx) {
  const { id, username } = ctx.message.author;

  await ctx.db.LolPlayer.delete({ userId: id });
  await ctx.message.channel.send(`Player **${username}** removed from the list of LoL players!`);
}
