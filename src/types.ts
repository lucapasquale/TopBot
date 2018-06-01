import { Message, TextChannel } from 'discord.js';
import { Database } from './database';

export type Database = Database;

export type Context = {
  message: Message;
  db: Database;
};

export type Command = {
  tag: string[];
  handler: (args: string[], message: Context) => Promise<void>;
  doc?: CommandDoc,
};

export type CommandDoc = {
  args: string[];
  description: string;
};

export type Cron = {
  interval: string;
  handler: (textChannel: TextChannel, db: Database) => Promise<void>;
};
