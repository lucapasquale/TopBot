import { Logger } from 'winston';
import { Client, Message, TextChannel } from 'discord.js';
import { Database } from './common/database';
import * as Joi from 'joi';

export type Logger = Logger;
export type Database = Database;

export interface Context {
  log: Logger;
  db: Database;
  client: Client;
  commands: Command[];
}

export interface CommandCtx extends Context {
  message: Message;
}
export interface Command {
  tag: string[];
  handler: (args: string[], ctx: CommandCtx) => Promise<any>;
  validation: {
    args: string[];
    schema?: Joi.Schema;
  };
  doc?: {
    args: string[];
    description: string;
  };
}

export interface CronCtx extends Context {
  channel: TextChannel;
}
export interface Cronjob {
  interval: string;
  handler: (ctx: CronCtx) => Promise<void>;
}
