import * as Discord from 'discord.js';
import * as bluebird from 'bluebird';

import { summoner, activeGame, positions } from './helpers/lol-api';


export default async function (cmds: string[], message: Discord.Message) {
  const summonerName = cmds[0];
  const { id } = await summoner(summonerName);

  const game = await activeGame(id);
  const playersPosition = await getPlayersPosition(game.participants);

  const fields = generateTeamField(game, playersPosition);

  await message.channel.send({
    embed: {
      fields,
      title: 'test',
    },
  });
}

async function getPlayersPosition(participants: any) {
  return bluebird.map(participants, (p: any) => {
    return positions(p.summonerId);
  });
}

function generateTeamField(game: any, positions: any) {
  const { participants, bannedChampions } = game;

  let fields: any[] = [];
  fields = fields.concat(teamFields('Blue Team', 0, 5));
  fields = fields.concat(teamFields('Red Team', 5, 10));

  return fields;

  function teamFields(teamName: string, start: number, end: number) {
    const names: string[] = [];
    const champions: string[] = [];
    const ranks: string[] = [];

    for (let i = start; i < end; i += 1) {
      const { summonerName, championId } = participants[i];
      names.push(summonerName);
      champions.push(championId);

      const { tier } = positions[i][0] || { tier: 'unranked' };
      ranks.push(tier);
    }

    return [
      {
        name: teamName,
        value: names.join('\n'),
        inline: true,
      },
      {
        name: 'Champion',
        value: champions.join('\n'),
        inline: true,
      },
      {
        name: 'Rank',
        value: ranks.join('\n'),
        inline: true,
      },
    ];
  }
}
