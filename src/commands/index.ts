import * as Discord from 'discord.js';

import economy from './economy';
import lol from './lol';
import stream from './stream';
import vapor from './vapor';


export default async function (message: Discord.Message) {
  const cmds = getCommands(message.content);

  let command;
  switch (cmds[0]) {
    case 'economy': command = economy; break;
    case 'lol': command = lol; break;
    case 'stream': command = stream; break;
    case 'vapor': command = vapor; break;
  }

  if (command) {
    cmds.shift();
    await command(cmds, message);
  }
}

function getCommands(content: string) {
  const cleanText = content.trim().substring(1);
  return cleanText.split(' ');
}
