import * as Discord from 'discord.js';
import * as ytdl from 'ytdl-core';

import { setVolume } from './helpers/play-next';


export default async function (cmds: string[], message: Discord.Message) {
  if (!Number(cmds[0])) {
    await message.channel.send('Invalid value!');
  }

  const value = +cmds[0] / 100;
  setVolume(value);

  await message.channel.send(`Volume for next music set to ${cmds}`);
}
