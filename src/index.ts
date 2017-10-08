import * as Discord from 'discord.js';
import config from './config';

import commands from './commands';
import crons from './crons';


const client = new Discord.Client();
client.login(config.DISCORD_KEY);


client.on('ready', () => {
  console.log('Bot on!');
  crons(client.channels.first() as Discord.TextChannel);
});

client.on('message', async (message) => {
  if (message.content.charAt(0) === '$') {
    await commands(message);
  }
});
