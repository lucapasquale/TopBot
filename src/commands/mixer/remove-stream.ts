import * as Discord from 'discord.js';
import db from '../../common/db';


export default async function (cmds: string[], message: Discord.Message) {
  const token = cmds[0];

  if (!token) {
    message.channel.send('Please inform a Mixer user!');
    return;
  }

  removeStream(token, message);
}

function removeStream(token: string, message: Discord.Message) {
  db.get('streams')
    .remove({ token })
    .write();

  message.channel.send(`Stream **${token}** removed from list of streamers`);
}
