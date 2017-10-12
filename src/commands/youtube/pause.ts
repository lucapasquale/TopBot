import * as Discord from 'discord.js';
import * as ytdl from 'ytdl-core';

import { isPlaying, streamDispatcher, setIsPlaying } from './helpers/play-next';
import db from '../../common/db';


export default async function (cmds: string[], message: Discord.Message) {
  if (!isPlaying && streamDispatcher) {
    return;
  }

  streamDispatcher.pause();

  setIsPlaying(false);
  db.set('server.musicStoppedTime', new Date()).write();
}


