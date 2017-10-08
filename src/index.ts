import * as Discord from 'discord.js';
import commands from './commands';
import crons from './crons';


const client = new Discord.Client();
client.login(process.env.DISCORD_KEY || '');


client.on('ready', async () => {
  console.log('Bot on');
  crons(client.channels.first() as Discord.TextChannel);
});

client.on('message', async (message) => {
  if (message.content.charAt(0) === '$') {
    await commands(message);
  }
});
