import { Context } from '../../../types';


export default async function (args: string[], ctx: Context) {
  const { id, username } = ctx.message.author;

  await ctx.db.LolPlayer.findCreateFind({
    where: { userId: id },
    defaults: { username },
  });

  await ctx.message.channel.send(`Player **${username}** added to the list of LoL players!`);
}
