import { CommandCtx } from '../../../types';
import { Args } from './schema';

export default async function(args: Args, ctx: CommandCtx) {
  const { id: userId } = ctx.message.author;

  if (!args.game) {
    return removePlayerFromAllGames(ctx, userId);
  }

  const game = await ctx.db.Game.findOne({ code: args.game });
  if (!game) {
    return ctx.message.channel.send('invalid game!');
  }

  await ctx.db.Player.delete({ userId, game });

  return ctx.message.reply(
    `you were removed to the list of players of ${game.name}`
  );
}

async function removePlayerFromAllGames(ctx: CommandCtx, userId: string) {
  await ctx.db.Player.delete({ userId });
  return ctx.message.reply('have been removed from the teams!');
}
