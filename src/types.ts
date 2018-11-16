import { Logger } from 'winston';
import { Message, TextChannel } from 'discord.js';
import { Database } from './common/db';

export type Logger = Logger;
export type Database = Database;

export interface BaseContext {
  log: Logger;
  db: Database;
  commands: Command[];
}

export type CommandCtx = BaseContext & {
  message: Message;
};
export interface Command {
  tag: string[];
  handler: (args: string[], ctx: CommandCtx) => Promise<any>;
  doc?: {
    args: string[];
    description: string;
  };
}

export interface CronCtx extends BaseContext {
  channel: TextChannel;
}
export interface Cronjob {
  interval: string;
  handler: (ctx: CronCtx) => Promise<void>;
}
