import * as Discord from 'discord.js';
import * as bluebird from 'bluebird';

import { summoner, activeGame, positions } from './helpers/lol-api';
import getPosition from './helpers/get-position';
import db from '../../common/db';


export default async function (cmds: string[], message: Discord.Message) {
  const summonerName = cmds[0];
  const { id } = await summoner(summonerName);

  const game = await activeGame(id);
  const playersPosition = await getPlayersPosition(game.participants);

  const content = generateMessage(game, playersPosition);

  await message.channel.send(content);
}

async function getPlayersPosition(participants: any) {
  return bluebird.map(participants, (p: any) => {
    return positions(p.summonerId);
  });
}

function generateMessage(game: any, positions: any) {
  const { participants, gameQueueConfigId, bannedChampions } = game;
  const champions = db.get('lol.champions').value();

  const teamOneValue: string[] = [];
  const teamTwoValue: string[] = [];

  participants.forEach((p: any, i: number) => {
    const { summonerName, championId, teamId } = p;
    const selectedChampion = champions[championId].name;

    const { tier, rank } = getPosition(positions[i], gameQueueConfigId);

    const playerValue = [
      fixedSizeString(`${tier} ${rank}`, 16),
      fixedSizeString(selectedChampion, 16),
      fixedSizeString(summonerName, 16),
    ];

    if (teamId === 100) teamOneValue.push(playerValue.join(''));
    if (teamId === 200) teamTwoValue.push(playerValue.join(''));
  });

  return `
Team Blue: \`\`\`${teamOneValue.join('\n')}\`\`\`
Team Red: \`\`\`${teamTwoValue.join('\n')}\`\`\`
  `;
}


function fixedSizeString(text: string, size: number) {
  const diff = size - text.length;
  if (diff > 0) {
    return text + ' '.repeat(diff);
  }

  return text.substring(0, size - 1) + ' ';
}
