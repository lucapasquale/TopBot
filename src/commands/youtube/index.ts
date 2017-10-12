import * as Discord from 'discord.js';

import play from './play';
import skip from './skip';
import stop from './stop';
import volume from './volume';
import resume from './resume';
import pause from './pause';


export default async function (cmds: string[], message: Discord.Message) {
  let command;

  switch (cmds[0]) {
    case 'play': command = play; break;
    case 'skip': command = skip; break;
    case 'stop': command = stop; break;
    case 'volume': command = volume; break;
    case 'resume': command = resume; break;
    case 'pause': command = pause; break;

    default: command = play; cmds.unshift('');
  }

  cmds.shift();
  await command(cmds, message);
}
