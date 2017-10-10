import * as Discord from 'discord.js';
import * as ytdl from 'ytdl-core';

import { playNextVideo } from './helpers/play-next';


export default async function (cmds: string[], message: Discord.Message) {
  await playNextVideo(message);
}
