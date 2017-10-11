import * as Discord from 'discord.js';
import * as ytdl from 'ytdl-core';

import { addToQueue, queue } from './helpers/add-to-queue';
import { isPlaying, playNextVideo } from './helpers/play-next';


export default async function (cmds: string[], message: Discord.Message) {
  await addToQueue(cmds, message);

  if (!isPlaying && queue.length > 0) {
    await playNextVideo(message);
  }
}


