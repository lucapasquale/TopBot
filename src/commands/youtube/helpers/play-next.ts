import * as Discord from 'discord.js';
import * as ytdl from 'ytdl-core';

import { addToQueue, queue } from './add-to-queue';


export let isPlaying: boolean = false;
export let streamDispatcher: Discord.StreamDispatcher;
export let audioConnection: Discord.VoiceConnection;

export async function playNextVideo(message: Discord.Message) {
  if (queue.length === 0) {
    isPlaying = false;
    streamDispatcher.end();

    audioConnection.disconnect();
    audioConnection = null;
    return;
  }

  const videoInfo = queue[0];
  const audioStream = ytdl(`https://www.youtube.com/watch?v=${videoInfo.videoId}`);

  if (!audioConnection) {
    const { voiceChannel } = message.member;
    audioConnection = await voiceChannel.join();
  }

  streamDispatcher = audioConnection.playStream(audioStream, { volume: 0.25 });

  isPlaying = true;
  queue.splice(0);

  streamDispatcher.once('end', async (reason) => {
    if (isPlaying && queue.length > 0) {
      return playNextVideo(message);
    }

    isPlaying = false;
  });
}
