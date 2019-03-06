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
  const queue = currentGame.gameQueueConfigId === 420 ? 'solo' : 'flex'

  const blueTeam = currentGame.teams.find(t => t.teamId === 100)
  const redTeam = currentGame.teams.find(t => t.teamId === 200)

  return {
    fields: [
      {
        name: 'Blue Team',
        inline: true,
        value: blueTeam.participants
          .map(p => parseParticipants(queue, p))
          .join('\n\n'),
      },

      {
        name: 'Red Team',
        inline: true,
        value: redTeam.participants
          .map(p => parseParticipants(queue, p))
          .join('\n\n'),
      },
    ],
  }
}

function parseParticipants(queue: string, participant: Participants) {
  const summonerName = participant.summoner.name
  const champion = participant.champion.name

  const league = participant.summoner.leagues[queue]
  const currentRank = league ? `${league.tier} - ${league.rank}` : 'Unranked'

  return [`${summonerName} - ${champion}`, `${currentRank}`].join('\n')
}
