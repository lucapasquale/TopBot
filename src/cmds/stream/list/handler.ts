import * as R from 'ramda';
import { Context } from '../../../types';
import { Streams } from '../../../models/Streams';


export default async function (args: string[], ctx: Context) {
  const streams = await ctx.db.Streams.findAll({ order: [['online', 'DESC']] });
  if (streams.length === 0) {
    await ctx.message.channel.send('No streams added!');
    return;
  }

  const { content, embed } = generateMessage(streams);
  await ctx.message.channel.send(content, { embed });
}

function generateMessage(streams: Streams[]) {
  const twitchValue = [] as string[];
  const mixerValue = [] as string[];

  streams.forEach(({ online, token, service }) => {
    const value = online ? `**${token}**` : token;

    switch (service) {
      case 'twitch': return twitchValue.push(value);
      case 'mixer': return mixerValue.push(value);
    }
  });

  return {
    content: 'Streams:',
    embed: {
      fields: [
        { name: 'Twitch', value: twitchValue.join('\n'), inline: true },
        { name: 'Mixer', value: mixerValue.join('\n'), inline: true },
      ],
    },
  };
}
