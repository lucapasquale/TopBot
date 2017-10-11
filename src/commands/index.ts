import * as Discord from 'discord.js';

import mixer from './mixer';
import youtube from './youtube';


export default async function (message: Discord.Message) {
  const cmds = getCommands(message.content);

  let command;
  switch (cmds[0]) {
    case 'mixer': command = mixer; break;
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
