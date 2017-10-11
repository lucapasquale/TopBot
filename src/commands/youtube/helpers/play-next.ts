import * as Discord from 'discord.js';
import * as ytdl from 'ytdl-core';

import { addToQueue, queue } from './add-to-queue';
import setGame from '../../../common/set-game';
import db from '../../../common/db';


let volume: number = 0.5;
export let isPlaying: boolean = false;
export let streamDispatcher: Discord.StreamDispatcher;
export let audioConnection: Discord.VoiceConnection;

export async function playNextVideo(message: Discord.Message) {
  if (queue.length === 0) {
    isPlaying = false;
    streamDispatcher.end();

    db.set('server.lastSongTime', new Date()).write();
    setGame('');

    return;
  }

  const videoInfo = queue[0];
  const audioStream = ytdl(`https://www.youtube.com/watch?v=${videoInfo.videoId}`);

  if (!audioConnection) {
    const { voiceChannel } = message.member;
    if (!voiceChannel) {
      await message.channel.send('Please enter in a voice channel');
      return;
    }

    audioConnection = await voiceChannel.join();
  }

  streamDispatcher = audioConnection.playStream(audioStream, { volume });

  db.set('server.lastSongTime', null).write();
  setGame(videoInfo.title);

  isPlaying = true;
  queue.splice(0);

  streamDispatcher.once('end', async (reason) => {
    if (isPlaying && queue.length > 0) {
      return playNextVideo(message);
    }

    isPlaying = false;
  });
}

export function setVolume(value: number) {
  const safeValue = Math.max(0, Math.min(1, value));

  volume = safeValue;
  db.set('server.volume', volume).write();
}
