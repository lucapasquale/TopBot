import * as Discord from 'discord.js';

import commands from './commands';

import { test } from './commands/youtube';


const bot = new Discord.Client();
bot.login(process.env.DISCORD_KEY);

bot.on('ready', () => {
  console.log('Bot on');
});

bot.on('message', (message) => {
  if (message.content.charAt(0) === '$' && message.author.id !== bot.user.id) {
    // await commands(message);
    // await message.delete();

    const voiceChannel = message.member.voiceChannel;
    if (voiceChannel) {
      voiceChannel.join().then((connection) => {
        test(connection);
      });
    }
  }
});

// bot.on('message', async (message) => {
  // if (message.content.charAt(0) === '$' && message.author.id !== bot.user.id) {
  //   // await commands(message);
  //   // await message.delete();

  //   const voiceChannel = message.member.voiceChannel;
  //   if (voiceChannel) {
  //     voiceChannel.join().then((connection) => {
  //       test(connection);
  //     });
  //   }
  // }
// });
