import { CommandCtx } from '../../../types'
import getCurrentGame, { CurrentGame, Participants } from './get-current-game'
import { Args } from './schema'

export default async function(args: Args, ctx: CommandCtx) {
  const nickname = await getPlayerNickname(ctx, args)

  const currentGame = await getCurrentGame(nickname)
  if (!currentGame) {
    return ctx.message.reply(`${nickname} is not ingame!`)
  }

  const embed = createEmbed(currentGame)
  await ctx.message.channel.send(`${nickname} current game:`, { embed })
}

async function getPlayerNickname(ctx: CommandCtx, args: Args) {
  if (args.nickname) {
    return args.nickname
  }

  const player = await ctx.db.LolPlayer.findOne({
    userId: ctx.message.author.id,
  })

  return player && player.nickname
}

function createEmbed(currentGame: CurrentGame) {
  const blueTeam = currentGame.teams.find(t => t.teamId === 100)
  const redTeam = currentGame.teams.find(t => t.teamId === 200)

  return {
    fields: [
      {
        name: 'Blue Team',
        value: blueTeam.participants
          .map(p => parseParticipants(currentGame, p))
          .join('\n'),
      },

      {
        name: 'Red Team',
        value: redTeam.participants
          .map(p => parseParticipants(currentGame, p))
          .join('\n'),
      },
    ],
  }
}

function parseParticipants(game: CurrentGame, participant: Participants) {
  const summonerName = participant.summoner.name
  const champion = participant.champion.name

  const queue = game.queue === 'RANKED_FLEX_5V5' ? 'flex' : 'solo'
  const league = participant.summoner.leagues[queue]

  const currentRank = league ? `${league.tier} - ${league.rank}` : 'UNRAKNED'

  return [
    '`',
    fixedSizeString(summonerName, 20),
    fixedSizeString(champion, 14),
    fixedSizeString(currentRank, 15),
    '`',
  ].join('')
}

function fixedSizeString(text: string, size: number) {
  const diff = size - text.length
  if (diff > 0) {
    return text + ' '.repeat(diff)
  }

  return text.substring(0, size - 1) + ' '
}
