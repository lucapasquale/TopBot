import * as Discord from 'discord.js';
import db from '../../common/db';


export default async function (cmds: string[], message: Discord.Message) {
  const token = cmds[0];

  if (!token) {
    await message.channel.send('Please inform a Mixer user!');
    return;
  }

  addStream(token, message);
}

async function addStream(token: string, message: Discord.Message) {
  const existingStream = db.get('streams')
    .find({ token })
    .value();

  if (existingStream) {
    await message.channel.send(`Stream **${token}** was already on the list`);
    return;
  }

  db.get('streams')
    .push({ token, online: false })
    .write();

  await message.channel.send(`Stream **${token}** added to list of streamers`);
}
