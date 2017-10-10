import * as Discord from 'discord.js';
import * as ytdl from 'ytdl-core';

import queue from './queue';


export default async function (cmds: string[], message: Discord.Message) {
  const videoId = getVideoId(cmds[0]);
  const url = `https://www.youtube.com/watch?v=${videoId}`;

  const videoInfo = await ytdl.getInfo(url);
  queue.push({
    videoId,
    title: videoInfo.title,
    length: +videoInfo.length_seconds,
    addedBy: message.author.username,
  });
}


function getVideoId(url: string) {
  const matches = url.match(/(?:\?v=|&v=|youtu\.be\/)(.*?)(?:\?|&|$)/);

  if (matches) {
    return matches[1];
  }

  return 'dQw4w9WgXcQ';
}
