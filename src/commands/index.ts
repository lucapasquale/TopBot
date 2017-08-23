import * as Discord from 'discord.js';
import youtube from './youtube';


export default function (message: Discord.Message) {
  const { content } = message;
  const cmds = getCommands(content);
  
  return youtube(cmds, message);
}

function getCommands(content: string) {
  const cleanText = content.trim().substring(1);
  return cleanText.split(' ');
}
