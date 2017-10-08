import * as Discord from 'discord.js';
import * as bluebird from 'bluebird';
import axios from 'axios';

import db, { Stream } from '../../common/db';


const request = axios.create({
  baseURL: 'https://mixer.com/api/v1',
});

export default async function (channel: Discord.TextChannel) {
  const streams = db.get('streams').values();

  await bluebird.each(streams, async (stream: Stream) => {
    try {
      const { data } = await request.get(`channels/${stream.token}/details`);

      if (data.online && !stream.online) {
        channel.send(`Stream ${stream.token} online!`);
      }

      updateStream(stream.token, data.online);
    }
    catch (e) { }
  });
}


function updateStream(token: string, online: boolean) {
  db.get('streams')
    .find({ token })
    .assign({ online })
    .write();
}
