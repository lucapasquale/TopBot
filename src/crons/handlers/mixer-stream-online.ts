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
        const { content, embed } = generateMessage(stream.token, data);
        await channel.send(content, { embed });
      }

      updateStream(stream.token, data.online);
    }
    catch (e) { }
  });
}

function generateMessage(token: string, data: any) {
  const { name, viewersCurrent } = data;
  const game = data.type.name;

  const url = `https://mixer.com/${token}`;

  const content = `**${token}** is now streaming!\n${url}`;
  const embed = {
    url,
    title: name,
    description: `Game: **${game}**\nViewers: **${viewersCurrent}**`,
    color: 16777215,
    thumbnail: {
      url: 'https://github.com/mixer/branding-kit/blob/master/png/MixerMerge_Dark.png?raw=true',
    },
  };

  return {
    content, embed,
  };
}


function updateStream(token: string, online: boolean) {
  db.get('streams')
    .find({ token })
    .assign({ online })
    .write();
}
