import * as Discord from 'discord.js';
import * as ytdl from 'ytdl-core';


export default function (cmds: string[], message: Discord.Message) {
  const videoId = getVideoId(cmds[1]);
  if (!videoId) {
    return;
  }

  const audioStream = ytdl('https://www.youtube.com/watch?v=' + videoId);

  connectToChannel(message).then((connection) => {
    connection.playStream(audioStream);
  });
}

function getVideoId(url: string) {
  const regex = /(?:\?v=|&v=|youtu\.be\/)(.*?)(?:\?|&|$)/;
  const matches = url.match(regex);

  if (matches) {
    return matches[1];
  } else {
    return url;
  }
}

function connectToChannel(message: Discord.Message) {
  const { voiceChannel } = message.member;

  if (voiceChannel) {
    return voiceChannel.join();
  }
}
