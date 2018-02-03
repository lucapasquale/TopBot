import * as Discord from 'discord.js';
import * as later from 'later';

import { Db, Cron } from '../types';
import jobs from './jobs';


export function startCrons(textChannel: Discord.TextChannel, db: Db) {
  jobs.map(({ handler, interval }) => {
    later.setInterval(() => handler(textChannel, db), later.parse.text(interval));
  });
}
