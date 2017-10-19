import * as Discord from 'discord.js';
import db, { Stream } from '../../common/db';


export default async function (cmds: string[], message: Discord.Message) {
  const streams = db.get('streams').values();

  const content = streams.map((stream: Stream) => {
    const { token, online } = stream;

    return online ? `**${token}**` : token;
  });

  await message.channel.send(`Mixer streams:\n${content.join(', ')}`);
}
