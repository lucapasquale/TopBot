import { Logger } from 'pino';
import { Message, TextChannel } from 'discord.js';
import { Database } from './database';

export type Logger = Logger;
export type Database = Database;

export type BaseContext = {
  logger: Logger;
  db: Database;
  commands: Command[];
};

export type CommandCtx = BaseContext & {
  message: Message;
};
export type Command = {
  tag: string[];
  handler: (args: string[], ctx: CommandCtx) => Promise<any>;
  doc?: {
    args: string[];
    description: string;
  }
};

export type CronCtx = BaseContext & {
  channel: TextChannel;
};
export type Cronjob = {
  interval: string;
  handler: (ctx: CronCtx) => Promise<void>;
};
