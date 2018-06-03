import * as Discord from 'discord.js';
import * as fs from 'fs';
import * as path from 'path';

import { Logger, Database, Command } from '../types';
import onReady from './on-ready';
import onMessage from './on-message';
import config from '../config';

const client = new Discord.Client();

export async function startClient(logger: Logger, db: Database) {
  client.login(config.DISCORD_KEY);

  const commands = getAllCommands(`${__dirname}/commands`);
  const baseCtx = { logger, db, commands };

  client.on('ready', async () => {
    await onReady(client, baseCtx);
  });

  client.on('message', async (message) => {
    await onMessage(message, baseCtx);
  });
}

function getAllCommands(commandsPath: string): Command[] {
  const cmds = [] as string[];

  fs.readdirSync(commandsPath)
    .forEach((folder) => {
      if (hasHandler(commandsPath, folder)) {
        cmds.push(folder);
        return;
      }

      const folderPath = path.join(commandsPath, folder);
      fs.readdirSync(folderPath)
        .forEach((subFolder) => {
          if (hasHandler(folderPath, subFolder)) {
            cmds.push(path.join(folder, subFolder));
          }
        });
    });

  return cmds.map((job) => {
    const definition = module.require(path.join(commandsPath, job)).default;
    return definition;
  });
}

function hasHandler(basePath: string, folderName: string): boolean {
  const commandPath = path.join(basePath, folderName, 'handler.js');
  return fs.existsSync(commandPath);
}
