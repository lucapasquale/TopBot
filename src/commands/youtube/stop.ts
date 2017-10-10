import * as Discord from 'discord.js';
import * as ytdl from 'ytdl-core';

import { queue } from './helpers/add-to-queue';
import { playNextVideo } from './helpers/play-next';



export default async function (cmds: string[], message: Discord.Message) {
  while (queue.length > 0) {
    queue.pop();
  }

  await playNextVideo(message);
}
