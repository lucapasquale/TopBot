import * as R from 'ramda';
import { Context } from '../../../../types';
import { Stream } from '../../../../database/entities/Stream';

export default async function (_: string[], ctx: Context) {
  const streams = await ctx.db.Stream.find({
    order: { online: 'DESC' },
  });

  if (streams.length === 0) {
    return ctx.message.channel.send('No streams added!');
  }

  const { content, embed } = generateMessage(streams);
  return ctx.message.channel.send(content, { embed });
}

const firstLetterUpperCase = R.compose(
  R.join(''),
  R.juxt([R.compose(R.toUpper, R.head), R.tail]),
);

function generateMessage(allStreams: Stream[]) {
  const serviceStreams = R.groupBy<Stream>(R.prop('service'), allStreams);
  const services = R.keys(serviceStreams);

  const fields = services.map((service: string) => {
    const streams = serviceStreams[service];
    const values = streams.map(({ online, token }: Stream) => {
      return online ? `**${token}**` : token;
    });

    return {
      name: firstLetterUpperCase(service),
      value: values.join('\n'),
      inline: true,
    };
  });

  return {
    content: 'Streams:',
    embed: { fields },
  };
}
