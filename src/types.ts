import * as Discord from 'discord.js';
import { Db } from './common/db';

export type Db = Db;

export type Context = {
  message: Discord.Message;
  db: Db;
  cmds: Command[];
};

export type Doc = {
  description: string;
  args: string[];
};

export type Command = {
  doc?: Doc,
  tag: string[];
  handler: (args: string[], message: Context) => Promise<void>;
};

export type Cron = {
  handler: (textChannel: Discord.TextChannel, db: Db) => Promise<void>;
  interval: string;
};
