import * as R from 'ramda';

import { CommandCtx } from '../../../types';
import Stream from '../../../models/stream';

export default async function(_: string[], ctx: CommandCtx) {
  const streams = await ctx.db.Stream.find({
    order: { online: 'DESC' },
  });

  if (streams.length === 0) {
    return ctx.message.channel.send('No streams added!');
  }

  const { content, embed } = generateMessage(streams);
  return ctx.message.channel.send(content, { embed });
}

function generateMessage(allStreams: Stream[]) {
  const serviceStreams = R.groupBy<Stream>(R.prop('service'), allStreams);
  const services = R.keys(serviceStreams);

  const fields = services.map((service: string) => {
    const streams = serviceStreams[service];
    const values = streams.map(({ online, name }: Stream) => {
      return online ? `**${name}**` : name;
    });

    return {
      name: service,
      value: values.join('\n'),
      inline: true,
    };
  });

  return {
    content: 'Streams:',
    embed: { fields },
  };
}
