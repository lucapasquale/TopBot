import * as fs from 'fs';
import * as path from 'path';
import { Client } from 'discord.js';

import { Logger, Database, Command } from '../../types';
import config from '../../config';
import onReady from './on-ready';
import onMessage from './on-message';

export async function startClient(log: Logger, db: Database) {
  const client = new Client();
  client.login(config.DISCORD_KEY);

  const commands = getAllCommands(`${__dirname}/commands`);
  const baseCtx = { log, db, commands };

  client.on('ready', async () => {
    await onReady(client, baseCtx);
  });

  client.on('message', async message => {
    await onMessage(message, baseCtx);
  });
}

function getAllCommands(commandsPath: string): Command[] {
  const cmds = [] as string[];

  fs.readdirSync(commandsPath).forEach(folder => {
    if (hasHandler(commandsPath, folder)) {
      cmds.push(folder);
      return;
    }

    const folderPath = path.join(commandsPath, folder);
    fs.readdirSync(folderPath).forEach(subFolder => {
      if (hasHandler(folderPath, subFolder)) {
        cmds.push(path.join(folder, subFolder));
      }
    });
  });

  return cmds.map(job => {
    const definition = module.require(path.join(commandsPath, job)).default;
    return definition;
  });
}

function hasHandler(basePath: string, folderName: string): boolean {
  const commandPath = path.join(basePath, folderName, 'handler.js');
  return fs.existsSync(commandPath);
}
