/* tslint:disable:max-line-length */
import * as Discord from 'discord.js';
import * as bluebird from 'bluebird';
import axios from 'axios';

import db, { Stream } from '../../common/db';
import config from '../../config';


export default async function (channel: Discord.TextChannel) {
  try {
    const mixerStreams = db.get('streams')
      .filter({ service: 'mixer' })
      .values();

    await bluebird.each(mixerStreams, async (stream: Stream) => {
      const { online, data } = await getStreamData(stream.token);

      if (stream.online !== online) {
        if (online) {
          const { content, embed } = createMessage(stream.token, data);
          channel.send(content, { embed });
        }

        db.get('streams')
          .find({ token: stream.token, service: 'mixer' })
          .assign({ online })
          .write();
      }
    });
  }
  catch (e) { }
}


const mixerRequest = axios.create({
  baseURL: 'https://mixer.com/api/v1',
});

async function getStreamData(token: string) {
  const { data } = await mixerRequest.get(`channels/${token}/details`);
  return { data, online: !!data.online };
}

function createMessage(token: string, data: any) {
  const { type, name, viewersCurrent } = data;
  const url = `https://mixer.com/${token}`;

  const content = `**${token}** is now streaming!\n${url}`;
  const embed = {
    url,
    title: name,
    description: `**Game:** ${type.name}\n**Viewers:** ${viewersCurrent}`,
    color: 0x1FBAED,
    thumbnail: {
      url: 'https://github.com/mixer/branding-kit/blob/master/png/MixerMerge_Dark.png?raw=true',
    },
  };

  return {
    content, embed,
  };
}
