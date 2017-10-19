/* tslint:disable:max-line-length */
import * as Discord from 'discord.js';
import * as bluebird from 'bluebird';
import axios from 'axios';

import db, { Stream } from '../../common/db';
import config from '../../config';


const services = {
  twitch: { online: twitchOnline, message: twitchMessage },
  mixer: { online: mixerOnline, message: mixerMessage },
};

export default async function (channel: Discord.TextChannel) {
  try {
    const streams = db.get('streams').values();

    await bluebird.each(streams, async (stream: Stream) => {
      const service = services[stream.service];
      const { online, data } = await service.online(stream.token);

      if (online && !stream.online) {
        const { content, embed } = service.message(stream.token, data);
        // await channel.send(content, { embed });
      }

      db.get('streams')
        .find({ token: stream.token, service: stream.service })
        .assign({ online })
        .write();
    });
  }
  catch (e) { }
}


const mixerRequest = axios.create({ baseURL: 'https://mixer.com/api/v1' });
async function mixerOnline(token: string) {
  const { data } = await mixerRequest.get(`channels/${token}/details`);
  return { data, online: !!data.online };
}

function mixerMessage(token: string, data: any) {
  const { type, name, viewersCurrent } = data;
  const url = `https://mixer.com/${token}`;

  const content = `**${token}** is now streaming!\n${url}`;
  const embed = {
    url,
    title: name,
    description: `**Viewers:** ${viewersCurrent}`,
    color: 0x1FBAED,
    thumbnail: {
      url: 'https://github.com/mixer/branding-kit/blob/master/png/MixerMerge_Dark.png?raw=true',
    },
  };

  return {
    content, embed,
  };
}


const twitchRequest = axios.create({
  baseURL: 'https://api.twitch.tv/helix',
  headers: { 'Client-ID': config.TWITCH_KEY },
});
async function twitchOnline(token: string) {
  const { data } = await twitchRequest.get(`streams?user_login=${token}`);
  const streamData = data.data[0];

  return { data: streamData, online: !!streamData };
}

function twitchMessage(token: string, data: any) {
  const { title, viewer_count } = data;
  const url = `https://go.twitch.tv/${token}`;

  const content = `**${token}** is now streaming!\n${url}`;
  const embed = {
    url,
    title,
    description: `**Viewers:** ${viewer_count}`,
    color: 0x6441A4,
    thumbnail: {
      url: 'https://static-cdn.jtvnw.net/jtv_user_pictures/panel-93518952-image-669b3764b63a3a07-320-320.png',
    },
  };

  return {
    content, embed,
  };
}
