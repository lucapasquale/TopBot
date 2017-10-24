import * as Discord from 'discord.js';
import * as commands from './commands';


export default async function (cmds: string[], message: Discord.Message) {
  let command;

  switch (cmds[0]) {
    case 'play': command = commands.play; break;
    case 'playlist': command = commands.playlist; break;
    case 'skip': command = commands.skip; break;
    case 'stop': command = commands.stop; break;
    case 'volume': command = commands.volume; break;
    case 'resume': command = commands.resume; break;
    case 'pause': command = commands.pause; break;

    default: command = commands.play; cmds.unshift('');
  }

  cmds.shift();
  await command(cmds, message);
}
