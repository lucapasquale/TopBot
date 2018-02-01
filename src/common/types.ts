import * as Discord from 'discord.js';
import { Db } from './db';


export type Context = {
  message: Discord.Message,
  db: Db,
};

export type Command = {
  tag: string[];
  handler: (args: string[], message: Context) => Promise<any>;
};

