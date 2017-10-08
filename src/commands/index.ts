import * as Discord from 'discord.js';

import mixer from './mixer';


export default async function (message: Discord.Message) {
  const { content } = message;
  const cmds = await getCommands(content);

  let command;
  switch (cmds[0]) {
    case 'mixer': command = mixer; break;
  }

  if (command) {
    cmds.shift();
    await command(cmds, message);
  }
}

async function getCommands(content: string) {
  const cleanText = content.trim().substring(1);
  return cleanText.split(' ');
}
