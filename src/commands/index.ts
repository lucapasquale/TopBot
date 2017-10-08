import * as Discord from 'discord.js';


export default async function (message: Discord.Message) {
  const { content } = message;
  const cmds = await getCommands(content);
}

async function getCommands(content: string) {
  const cleanText = content.trim().substring(1);
  return cleanText.split(' ');
}
