import * as Discord from 'discord.js';
import * as later from 'later';

import { Db, Cron } from '../types';
import crons from './crons';


export function startCrons(client: Discord.Client, db: Db) {
  const textChannel = getDefaultTextChannel(client.channels.array());

  crons.map(({ handler, interval }) => {
    later.setInterval(() => {
      try {
        handler(textChannel, db);
      } catch (e) {
        console.error(e);
      }
    }, later.parse.text(interval));
  });
}


function getDefaultTextChannel(channels: Discord.Channel[]) {
  const firstTextChannel = channels.filter((c: Discord.Channel) => c.type === 'text');
  return firstTextChannel[0] as Discord.TextChannel;
}
