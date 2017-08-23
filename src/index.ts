import * as Discord from 'discord.js';
import commands from './commands';


const bot = new Discord.Client();
bot.login(process.env.DISCORD_KEY);

bot.on('ready', () => {
  console.log('Bot on');
});

bot.on('message', (message) => {
  if (message.content.charAt(0) === '$') {
    commands(message);
  }
});
