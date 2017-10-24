import * as Discord from 'discord.js';
import * as bluebird from 'bluebird';

import db from '../../common/db';
import { getVersions, getChampions } from '../../commands/lol/helpers/lol-api';


export default async function (channel: Discord.TextChannel) {
  await bluebird.all([
    checkVersion(channel),
    updateChampions(channel),
  ]);
}


async function checkVersion(channel: Discord.TextChannel) {
  const versions = await getVersions();
  const [major, minor] = versions[0].split('.');

  db.set('lol.version', { major, minor }).write();
}


async function updateChampions(channel: Discord.TextChannel) {
  const champions = await getChampions();
  db.set('lol.champions', champions).write();
}
