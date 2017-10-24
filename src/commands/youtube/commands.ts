import * as Discord from 'discord.js';

import db from '../../common/db';
import addPlaylistToQueue from './helpers/add-playlist-to-queue';
import { queue, addToQueue } from './helpers/add-to-queue';
import { getPlaylistId, getVideoId } from './helpers/youtube-regexes';
import { isPlaying, playNextVideo, streamDispatcher, stopPlaying } from './helpers/play-next';


export async function play(cmds: string[], message: Discord.Message) {
  const videoId = getVideoId(cmds[0]);
  if (!videoId) {
    await message.channel.send('Invalid YouTube video url!');
    return;
  }

  await addToQueue(videoId, message);

  if (!isPlaying && queue.length > 0) {
    await playNextVideo(message);
  }
}


export async function playlist(cmds: string[], message: Discord.Message) {
  const playlistId = getPlaylistId(cmds[0]);
  if (!playlistId) {
    await message.channel.send('Invalid YouTube playlist url!');
    return;
  }

  await addPlaylistToQueue(playlistId);

  if (!isPlaying && queue.length > 0) {
    await playNextVideo(message);
  }
}


export async function pause(cmds: string[], message: Discord.Message) {
  if (!isPlaying && streamDispatcher) {
    return;
  }

  streamDispatcher.pause();
}


export async function resume(cmds: string[], message: Discord.Message) {
  if (isPlaying && streamDispatcher) {
    return;
  }

  streamDispatcher.resume();
}


export async function skip(cmds: string[], message: Discord.Message) {
  if (streamDispatcher) {
    streamDispatcher.emit('end');
  }
}


export async function stop(cmds: string[], message: Discord.Message) {
  queue.length = 0;

  await stopPlaying(message);
}


export async function volume(cmds: string[], message: Discord.Message) {
  if (!Number(cmds[0])) {
    await message.channel.send('Invalid value!');
  }

  const volume = +cmds[0] / 100;

  streamDispatcher.setVolume(volume);
  db.set('server.volume', volume).write();

  await message.channel.send(`Volume set to ${cmds[0]}`);
}
