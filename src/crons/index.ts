import * as Discord from 'discord.js';
import * as later from 'later';

import crons from './crons';


export default async function (channel: Discord.TextChannel) {
  crons.map(({ fn, interval }) => {
    // fn(channel);

    later.setInterval(() => fn(channel), later.parse.text(interval));
  });
}
