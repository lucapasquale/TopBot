import * as Discord from 'discord.js';
import * as later from 'later';

import { Database } from '../../types';
import cronjobs from './cronjobs';

export function startCrons(client: Discord.Client, db: Database) {
  const textChannel = getDefaultTextChannel(client.channels);

  cronjobs.map((cj) => {
    later.setInterval(() => {
      try {
        cj.handler(textChannel, db);
      } catch (error) {
        console.log('Error trying to execute cronjob', {
          error,
          cronjob: cj,
        });
      }
    },                later.parse.text(cj.interval));
  });
}

function getDefaultTextChannel(channels: Discord.Collection<string, Discord.Channel>) {
  const firstTextChannel = channels.filter((c: Discord.Channel) => c.type === 'text');
  return firstTextChannel.first() as Discord.TextChannel;
}
