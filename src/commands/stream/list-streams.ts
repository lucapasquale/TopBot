import * as Discord from 'discord.js';
import db, { Stream } from '../../common/db';


export default async function (cmds: string[], message: Discord.Message) {
  const streams = db.get('streams').value();

  const { embed } = generateMessage(streams);
  message.channel.send('Streams:', { embed });
}

function generateMessage(streams: Stream[]) {
  const onlineFirst = streams.sort((a, b) => +b.online - +a.online);

  const twitchValue: string[] = [];
  const mixerValue: string[] = [];

  onlineFirst.forEach(({ online, token, service }) => {
    const value = online ? `**${token}**` : token;

    switch (service) {
      case 'twitch': return twitchValue.push(value);
      case 'mixer': return mixerValue.push(value);
    }
  });

  return {
    embed: {
      fields: [
        { name: 'Twitch', value: twitchValue.join('\n') },
        { name: 'Mixer', value: mixerValue.join('\n') },
      ],
    },
  };
}
