import * as Discord from 'discord.js';
import config from '../config';


export function startClient(messageParser: Function) {
  const client = new Discord.Client();
  client.login(config.DISCORD_KEY);

  client.on('ready', () => {
    console.log('Bot on!');

    // const { textChannel } = getDefaultChannels(client.channels.array());
    // crons(textChannel as Discord.TextChannel);
  });

  client.on('message', (message) => {
    if (message.content.charAt(0) !== '$') {
      return;
    }

    return messageParser(message);
  });

  return client;
}


function getDefaultChannels(channels: Discord.Channel[]) {
  return {
    textChannel: channels.find((c: Discord.Channel) => c.type === 'text'),
    voiceChannel: channels.find((c: Discord.Channel) => c.type === 'voice'),
  };
}
