import * as Discord from 'discord.js';
import * as ytdl from 'ytdl-core';

import { addToQueue, queue } from './helpers';


let isPlaying = false;
let audioChannel: Discord.VoiceConnection;

export default async function (cmds: string[], message: Discord.Message) {
  await addToQueue(cmds, message);
  console.log(queue);

  if (!isPlaying) {
    await playNextVideo(message);
  }
}

async function playNextVideo(message: Discord.Message) {
  const videoInfo = queue[0];
  const audioStream = ytdl(`https://www.youtube.com/watch?v=${videoInfo.videoId}`);

  if (!audioChannel) {
    const { voiceChannel } = message.member;
    audioChannel = await voiceChannel.join();
  }

  const audioHandler = audioChannel.playStream(audioStream);

  isPlaying = true;
  queue.splice(0);

  audioHandler.once('end', async () => {
    if (isPlaying && queue.length > 0) {
      return playNextVideo(message);
    }

    isPlaying = false;
  });
}
