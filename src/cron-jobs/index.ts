import * as Discord from 'discord.js';
import * as later from 'later';

import { Db, Cron } from '../types';
import crons from './crons';
import { getDefaultSettings } from 'http2';


export function startCrons(client: Discord.Client, db: Db) {
  const textChannel = getDefaultTextChannel(client.channels.array());

  crons.map(({ handler, interval }) => {
    later.setInterval(() => handler(textChannel, db), later.parse.text(interval));
  });
}


function getDefaultTextChannel(channels: Discord.Channel[]) {
  const firstTextChannel = channels.find((c: Discord.Channel) => c.type === 'text');
  return firstTextChannel as Discord.TextChannel;
}
