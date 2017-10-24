import * as Discord from 'discord.js';
import * as bluebird from 'bluebird';
import axios from 'axios';

import db, { Stream } from '../../common/db';
import config from '../../config';


export default async function (channel: Discord.TextChannel) {
  try {
    const twitchStreams = db.get('streams')
      .filter({ service: 'twitch' })
      .values();

    await bluebird.each(twitchStreams, async (stream: Stream) => {
      const { online, data } = await getStreamData(stream.token);

      if (stream.online !== online) {
        if (online) {
          const { content, embed } = await createMessage(stream.token, data);
          channel.send(content, { embed });
        }

        db.get('streams')
          .find({ token: stream.token, service: 'twitch' })
          .assign({ online })
          .write();
      }
    });
  }
  catch (e) { }
}


const twitchRequest = axios.create({
  baseURL: 'https://api.twitch.tv/helix',
  headers: { 'Client-ID': config.TWITCH_KEY },
});

async function getStreamData(token: string) {
  const { data } = await twitchRequest.get(`streams?user_login=${token}`);
  const streamData = data.data[0];

  return { data: streamData, online: !!streamData };
}

async function getUserData(userId: number) {
  const { data } = await twitchRequest.get(`users?id=${userId}`);
  return data.data[0];
}


async function createMessage(token: string, streamData: any) {
  const { user_id, title, viewer_count } = streamData;

  const userData = await getUserData(user_id);
  const { display_name, profile_image_url } = userData;

  const url = `https://go.twitch.tv/${token}`;
  const content = `**${display_name}** is streaming!\n${url}`;

  const embed = {
    url,
    title: display_name,
    description: `${title}\n**Viewers:** ${viewer_count}`,
    color: 0x6441A4,
    thumbnail: {
      url: profile_image_url,
    },
  };

  return {
    content, embed,
  };
}
