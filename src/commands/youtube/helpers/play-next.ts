import * as Discord from 'discord.js';
import * as ytdl from 'ytdl-core';

import { addToQueue, queue } from './add-to-queue';
import setGame from '../../../common/set-game';
import db from '../../../common/db';


export let isPlaying: boolean;
export let streamDispatcher: Discord.StreamDispatcher;
let audioConnection: Discord.VoiceConnection;

export async function playNextVideo(message: Discord.Message) {
  if (queue.length === 0) {
    return stopPlaying(message);
  }

  if (!audioConnection) {
    const { voiceChannel } = message.member;
    if (!voiceChannel) {
      await message.channel.send('Please enter in a voice channel');
      return;
    }

    audioConnection = await voiceChannel.join();
  }

  const videoInfo = queue[0];
  const audioStream = ytdl(`https://www.youtube.com/watch?v=${videoInfo.videoId}`);

  const volume = db.get('server.volume').value();
  streamDispatcher = audioConnection.playStream(audioStream, { volume });

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


export function setIsPlaying(value: boolean) {
  isPlaying = value;
}

async function stopPlaying(message: Discord.Message) {
  setGame('');
  isPlaying = false;

  streamDispatcher.end();
  audioConnection.disconnect();

  await message.channel.send('Queue is empty, leaving channel');
}
