import * as Discord from 'discord.js';
import db from '../../common/db';


export default async function (cmds: string[], message: Discord.Message) {
  const token = cmds[0];

  if (!token) {
    await message.channel.send('Please inform a Mixer user!');
    return;
  }

  removeStream(token, message);
}

async function removeStream(token: string, message: Discord.Message) {
  db.get('streams')
    .remove({ token })
    .write();

  await message.channel.send(`Stream **${token}** removed from list of streamers`);
}
