import * as Joi from 'joi'
import { Logger } from 'winston'
import { Client, Message, TextChannel } from 'discord.js'
import { Database } from './common/database'

export type Logger = Logger
export type Database = Database

export type Context = {
  log: Logger
  db: Database
  client: Client
  commands: Command[]
}

export type CommandCtx = Context & {
  message: Message
}
export type Command = {
  tag: string[]
  handler: (args: any, ctx: CommandCtx) => Promise<any>
  validation: {
    args: string[]
    schema?: Joi.Schema
  }
  help?: {
    description: string
  }
}

export type CronCtx = Context & {
  channel: TextChannel
}
export type Cronjob = {
  interval: string
  handler: (ctx: CronCtx) => Promise<void>
}
