import * as bluebird from 'bluebird';
import axios from 'axios';
import { CronCtx } from '../types';

const mixerRequest = axios.create({ baseURL: 'https://mixer.com/api/v1' });

export default async function handler(ctx: CronCtx) {
  const mixerStreams = await ctx.db.Stream.find({ service: 'mixer' });

  await bluebird.map(mixerStreams, async stream => {
    const { online, data } = await getStreamData(stream.token);

    if (stream.online !== online) {
      if (online) {
        const { content, embed } = createMessage(stream.token, data);
        await ctx.channel.send(content, { embed });
      }

      await ctx.db.Stream.update(stream.id, { online });
    }
  });
}

async function getStreamData(token: string) {
  const { data } = await mixerRequest.get(`channels/${token}/details`);
  return { data, online: !!data.online };
}

function createMessage(token: string, data: any) {
  const { type, name, viewersCurrent } = data;
  const url = `https://mixer.com/${token}`;

  return {
    content: `**${token}** is now streaming!\n${url}`,
    embed: {
      url,
      title: name,
      description: `**Game:** ${type.name}\n**Viewers:** ${viewersCurrent}`,
      color: 0x1fbaed,
      thumbnail: {
        url:
          'https://github.com/mixer/branding-kit/blob/master/png/MixerMerge_Dark.png?raw=true',
      },
    },
  };
}
