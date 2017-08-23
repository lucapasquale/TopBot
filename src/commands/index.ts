import * as Discord from 'discord.js';
import fap from './fap';
import ole from './ole';


export default async function(message: Discord.Message) {
  const { content } = message;

  const cleanText = content.trim().substring(1);
  const cmds = cleanText.split(' ');

  switch (cmds[0]) {
    case 'fap': await fap(cmds, message); break;
    case 'ole': await ole(cmds, message); break;
  }
}
