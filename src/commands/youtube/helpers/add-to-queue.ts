import * as Discord from 'discord.js';
import * as ytdl from 'ytdl-core';

import { isPlaying } from './play-next';


export const queue: VideoQueue[] = [];
export type VideoQueue = {
  videoId: string,
  addedBy: string,
  title: string,
  length: number,
};


export async function addToQueue(cmds: string[], message: Discord.Message) {
  const videoId = getVideoId(cmds[0]);
  if (!videoId) {
    await message.channel.send('Invalid YouTube video url!');
    return;
  }

  const url = `https://www.youtube.com/watch?v=${videoId}`;
  const videoInfo = await ytdl.getInfo(url);

  const videoQueue = {
    videoId,
    addedBy: message.author.username,
    title: videoInfo.title,
    length: +videoInfo.length_seconds,
  };

  queue.push(videoQueue);

  let queueTotal = queue.length;
  queueTotal += isPlaying ? 1 : 0;

  const content = `Video added to queue by **${message.author.username}**\nTotal: ${queueTotal}`;
  await message.channel.send(content, { embed: queueEmbed(videoInfo) });
}


function getVideoId(url: string) {
  const matches = url.match(/(?:\?v=|&v=|youtu\.be\/)(.*?)(?:\?|&|$)/);

  if (matches) {
    return matches[1];
  }

  return null;
}

function queueEmbed(videoInfo: ytdl.videoInfo) {
  const { author, title, length_seconds, video_url, view_count, thumbnail_url } = videoInfo;

  const minutes = Math.floor(+length_seconds / 60);
  const seconds = +length_seconds % 60;
  const duration = `${minutes}:${('0' + seconds).slice(-2)}`;

  const description = [`**${author.name}**`];
  description.push(duration);
  description.push(`${view_count} views`);

  return {
    title,
    description: description.join('\n'),
    url: video_url,
    color: 16777215,
    thumbnail: { url: thumbnail_url },
  };
}
