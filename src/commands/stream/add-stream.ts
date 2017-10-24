import * as Discord from 'discord.js';
import db from '../../common/db';


const availableServices = ['twitch', 'mixer'];

export default async function (cmds: string[], message: Discord.Message) {
  const [token, service] = cmds;

  if (!token && !service) {
    await message.channel.send('Please inform a user and stream service!');
    return;
  }

  if (!service || !availableServices.includes(service.toLowerCase())) {
    await message.channel.send('Please inform a valid stream service!');
    return;
  }

  addStream(token, service, message);
}

async function addStream(token: string, service: string, message: Discord.Message) {
  const existingStream = db.get('streams')
    .find({ token, service })
    .value();

  if (existingStream) {
    await message.channel.send(`Stream **${token}** was already on the list`);
    return;
  }

  db.get('streams')
    .push({ token, service, online: false })
    .write();

  await message.channel.send(`Stream **${token}** (${service}) added to list of streamers!`);
}
