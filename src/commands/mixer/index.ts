import * as Discord from 'discord.js';

import addStream from './add-stream';
import removeStream from './remove-stream';
import listStreams from './list-streams';


export default async function (cmds: string[], message: Discord.Message) {
  let command;

  switch (cmds[0]) {
    case 'add': command = addStream; break;
    case 'remove': command = removeStream; break;
    case 'list': command = listStreams; break;
  }

  if (command) {
    cmds.shift();
    await command(cmds, message);
  }
}
