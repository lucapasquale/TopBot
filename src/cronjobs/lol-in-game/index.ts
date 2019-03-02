import * as bluebird from 'bluebird';

import { CronCtx } from '../../types';
import Player from '../../models/player';
import getCurrentGame, { CurrentGame, Participants } from './get-current-game';

export default async function handler(ctx: CronCtx) {
  const players = await ctx.db.Player.find({
    where: { game: { code: 'lol' } },
  });

  await bluebird.map(players, async player => {
    const currentGame = await getCurrentGame(player.username);

    if (player.inGame !== !!currentGame) {
      await player.update({ inGame: !!currentGame });

      if (currentGame) {
        const { content, embed } = createMessage(player, currentGame);
        await ctx.channel.send(content, { embed });
      }
    }
  });
}

function createMessage(player: Player, currentGame: CurrentGame) {
  const queue = currentGame.gameQueueConfigId === 420 ? 'solo' : 'flex';

  const blueTeam = currentGame.teams.find(t => t.teamId === 100);
  const redTeam = currentGame.teams.find(t => t.teamId === 200);

  return {
    content: `${player.username} current game:`,
    embed: {
      fields: [
        {
          name: 'Team Blue',
          inline: true,
          value: blueTeam.participants
            .map(p => parseParticipants(queue, p))
            .join('\n\n'),
        },

        {
          name: 'Team Red',
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
