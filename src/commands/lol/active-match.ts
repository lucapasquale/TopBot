import * as Discord from 'discord.js';
import * as bluebird from 'bluebird';

import { getSummoner, getActiveGame, getPositions } from './helpers/lol-api';
import getPosition from './helpers/get-position';
import db from '../../common/db';


export default async function (cmds: string[], message: Discord.Message) {
  const summonerName = cmds[0];
  const { id } = await getSummoner(summonerName);

  const game = await getActiveGame(id);
  if (!game) {
    await message.channel.send(`**${summonerName}** is currently not in game!`);
    return;
  }

  const playersPosition = await getPlayersPosition(game.participants);

  const content = generateMessage(game, playersPosition);
  await message.channel.send(content);
}

async function getPlayersPosition(participants: any) {
  return bluebird.map(participants, (p: any) => {
    return getPositions(p.summonerId);
  });
}

function generateMessage(game: any, positions: any) {
  const { participants, gameQueueConfigId, bannedChampions } = game;
  const champions = db.get('lol.champions').value();

  const [blueTeam, redTeam] = teamsMessage(game, positions);
  const banned = bannedChampions.map((ban: any) => {
    const bannedChampion = champions[ban.championId];
    return bannedChampion ? bannedChampion.name : '*none*';
  });

  return `
**Team Blue:** \`\`\`${blueTeam.join('\n')}\`\`\`
**Team Red:** \`\`\`${redTeam.join('\n')}\`\`\`
**Bans:** ${banned.join(', ')}
  `;
}


function teamsMessage(game: any, positions: any) {
  const { participants, gameQueueConfigId, bannedChampions } = game;
  const champions = db.get('lol.champions').value();

  const teamOne: string[] = [];
  const teamTwo: string[] = [];

  participants.forEach((p: any, i: number) => {
    const { summonerName, championId, teamId } = p;
    const selectedChampion = champions[championId].name;

    const { tier, rank, wins, losses } = getPosition(positions[i], gameQueueConfigId);
    const percentage = (wins / (wins + losses)) * 100;
    const winsText = `W/L: ${wins}/${losses} - ${percentage.toPrecision(3)}%`;

    const playerValue = [
      fixedSizeString(`${tier} ${rank}`, 12),
      fixedSizeString(selectedChampion, 14),
      fixedSizeString(summonerName, 20),
      fixedSizeString(winsText, 25),
    ];

    if (teamId === 100) teamOne.push(playerValue.join(''));
    if (teamId === 200) teamTwo.push(playerValue.join(''));
  });

  return [teamOne, teamTwo];
}

function fixedSizeString(text: string, size: number) {
  const diff = size - text.length;
  if (diff > 0) {
    return text + ' '.repeat(diff);
  }

  return text.substring(0, size - 1) + ' ';
}
