import { CommandCtx } from '../../../types';
import getCurrentGame, { CurrentGame, Participants } from './get-current-game';

export default async function(_: any, ctx: CommandCtx) {
  const player = await ctx.db.Player.findOne({
    userId: ctx.message.author.id,
  });

  if (!player) {
    return ctx.message.reply('you are not saved as a LoL player');
  }

  const currentGame = await getCurrentGame(player.username);
  if (!currentGame) {
    return ctx.message.reply('you are not in a game!');
  }

  const { content, embed } = createMessage(player.username, currentGame);
  await ctx.message.channel.send(content, { embed });
}

function createMessage(username: string, currentGame: CurrentGame) {
  const queue = currentGame.gameQueueConfigId === 420 ? 'solo' : 'flex';

  const blueTeam = currentGame.teams.find(t => t.teamId === 100);
  const redTeam = currentGame.teams.find(t => t.teamId === 200);

  return {
    content: `${username} current game:`,
    embed: {
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
    },
  };
}

function parseParticipants(queue: string, participant: Participants) {
  const summonerName = participant.summoner.name;
  const champion = participant.champion.name;

  const league = participant.summoner.leagues[queue];
  const currentRank = league ? `${league.tier} - ${league.rank}` : 'Unranked';

  return [`${summonerName} - ${champion}`, `${currentRank}`].join('\n');
}
