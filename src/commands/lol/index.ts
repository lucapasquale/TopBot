import * as Discord from 'discord.js';

import activeMatch from './active-match';
import patchNotes from './patch-notes';


export default async function (cmds: string[], message: Discord.Message) {
  let command;

  switch (cmds[0]) {
    case 'match': command = activeMatch; break;
    case 'patch': command = patchNotes; break;

    // default: command = listStreams; cmds.unshift('');
  }

  cmds.shift();
  await command(cmds, message);
}
