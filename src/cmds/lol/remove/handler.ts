import { Context } from '../../../types';


export default async function (args: string[], ctx: Context) {
  const { id, username } = ctx.message.author;

  await ctx.db.LolPlayer.destroy({
    where: { userId: id },
  });

  await ctx.message.channel.send(`Player **${username}** removed from the list of LoL players!`);
}
