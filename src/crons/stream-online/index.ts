import * as Discord from 'discord.js';
import * as bluebird from 'bluebird';
import axios from 'axios';

import streams from './streams';


type Stream = { token: string, online: boolean };

const request = axios.create({
  baseURL: 'https://mixer.com/api/v1',
});

export default async function (channel: Discord.TextChannel) {
  await bluebird.each(streams, async (stream: Stream) => {
    try {
      const { data } = await request.get(`channels/${stream.token}/details`);
      console.log(data.token);

      if (data.online && !stream.online) {
        channel.send(`Stream ${stream.token} online!`);
      }

      stream.online = data.online;
    }
    catch (e) { }
  });
}
