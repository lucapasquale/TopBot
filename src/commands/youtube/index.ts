import * as Discord from 'discord.js';

import play from './play';


export default async function (cmds: string[], message: Discord.Message) {
  let command;

  switch (cmds[0]) {
    case 'play': command = play; break;

    default: command = play; cmds.push('');
  }

  cmds.shift();
  await command(cmds, message);
}
