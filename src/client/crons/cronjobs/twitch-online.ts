import { TextChannel } from 'discord.js';
import * as bluebird from 'bluebird';
import axios from 'axios';

import { Database } from '../../../types';
import config from '../../../config';

const twitchRequest = axios.create({
  baseURL: 'https://api.twitch.tv/helix',
  headers: { 'Client-ID': config.TWITCH_KEY },
});

export default async function (channel: TextChannel, db: Database) {
  const twitchStreams = await db.Stream.find({ service: 'twitch' });

  await bluebird.each(twitchStreams, async (stream) => {
    const { online, data } = await getStreamData(stream.token);

    if (stream.online !== online) {
      if (online) {
        const { content, embed } = await createMessage(stream.token, data);
        await channel.send(content, { embed });
      }

      await db.Stream.update(stream.id, { online });
    }
  });
}

async function getStreamData(token: string) {
  const { data } = await twitchRequest.get(`streams?user_login=${token}`);
  const streamData = data.data[0];

  return { data: streamData, online: !!streamData };
}

async function createMessage(token: string, streamData: any) {
  const { user_id, title, viewer_count } = streamData;

  const { display_name, profile_image_url } = await getUserData(user_id);
  const url = `https://go.twitch.tv/${token}`;

  return {
    content: `**${display_name}** is streaming!\n${url}`,
    embed: {
      url,
      title: display_name,
      description: `${title}\n**Viewers:** ${viewer_count}`,
      color: 0x6441A4,
      thumbnail: { url: profile_image_url },
    },
  };
}

async function getUserData(userId: number) {
  const { data } = await twitchRequest.get(`users?id=${userId}`);
  return data.data[0];
}