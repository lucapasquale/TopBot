import * as Discord from 'discord.js';

import config from './config';
import crons from './crons';
import commands from './commands';


const client = new Discord.Client();
client.login(config.DISCORD_KEY);
export default client;


client.on('ready', () => {
  console.log('Bot on!');

  const { textChannel } = getDefaultChannels(client.channels.array());
  crons(textChannel as Discord.TextChannel);
});

client.on('message', async (message) => {
  if (message.content.charAt(0) === '$') {
    await commands(message);
  }
});


function getDefaultChannels(channels: Discord.Channel[]) {
  const textChannels: Discord.Channel[] = [];
  const voiceChannels: Discord.Channel[] = [];

  channels.forEach((ch) => {
    if (ch.type === 'text') { textChannels.push(ch); }
    if (ch.type === 'voice') { voiceChannels.push(ch); }
  });

  return {
    textChannel: textChannels[0],
    voiceChannel: voiceChannels[0],
  };
}
