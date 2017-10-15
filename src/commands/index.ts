import * as Discord from 'discord.js';

import lol from './lol';
import mixer from './mixer';
import vapor from './vapor';
import youtube from './youtube';


export default async function (message: Discord.Message) {
  const cmds = getCommands(message.content);

  let command;
  switch (cmds[0]) {
    case 'lol': command = lol; break;
    case 'mixer': command = mixer; break;
    case 'vapor': command = vapor; break;
    case 'yt': command = youtube; break;
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
