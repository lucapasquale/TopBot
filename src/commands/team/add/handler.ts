import { CommandCtx } from '../../../types'
import Player from '../../../models/player'
import { Args } from './schema'

export default async function(args: Args, ctx: CommandCtx) {
  const { id: userId, username } = ctx.message.author

  const game = await ctx.db.Game.findOne({ code: args.game })
  if (!game) {
    return ctx.message.channel.send('invalid game!')
  }

  await ctx.db.Player.findOrCreate<Player>({ userId, game }, { username })

  return ctx.message.reply(
    `you were added to the list of players of ${game.name}`
  )
}
