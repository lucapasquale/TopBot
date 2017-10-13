import * as Discord from 'discord.js';
import * as ytdl from 'ytdl-core';

import { isPlaying, streamDispatcher } from './helpers/play-next';


export default async function (cmds: string[], message: Discord.Message) {
  if (!isPlaying && streamDispatcher) {
    return;
  }

  streamDispatcher.pause();
}


