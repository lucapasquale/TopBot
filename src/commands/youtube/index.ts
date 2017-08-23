import * as fs from 'fs';
import * as Discord from 'discord.js';
import * as ytdl from 'ytdl-core';


export function test(connection: Discord.VoiceConnection) {
  const videoId = get_video_id('https://www.youtube.com/watch?v=1V14g-NT6SU');
  const audioStream = ytdl('https://www.youtube.com/watch?v=' + videoId);
  console.log(audioStream);

  connection.playStream(audioStream);
}


function get_video_id(url: string) {
  const regex = /(?:\?v=|&v=|youtu\.be\/)(.*?)(?:\?|&|$)/;
  const matches = url.match(regex);

  if (matches) {
    return matches[1];
  } else {
    return url;
  }
}
