import * as Discord from 'discord.js';

import addPlayer from './add-player';
import removePlayer from './remove-player';
import team from './team';

export default async function (cmds: string[], message: Discord.Message) {
  let command;

  switch (cmds[0]) {
    case 'add': command = addPlayer; break;
    case 'remove': command = removePlayer; break;
    case 'team': command = team; break;

    default: command = team; cmds.unshift('');
  }

  cmds.shift();
  await command(cmds, message);
}
