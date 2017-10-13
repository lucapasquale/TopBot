import * as Discord from 'discord.js';
import * as ytdl from 'ytdl-core';

import { streamDispatcher } from './helpers/play-next';
import db from '../../common/db';


export default async function (cmds: string[], message: Discord.Message) {
  if (!Number(cmds[0])) {
    await message.channel.send('Invalid value!');
  }

  const volume = +cmds[0] / 100;

  streamDispatcher.setVolume(volume);
  db.set('server.volume', volume).write();

  await message.channel.send(`Volume set to ${cmds[0]}`);
}
