import * as fs from 'fs';
import * as path from 'path';
import * as R from 'ramda';
import { Command } from '../types';


export function getCommands(commandsPath: string) {
  const cmds = [] as any[];

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


export function findHandler(messageText: string, cmds: Command[]) {
  const tags = messageText.split(' ');

  for (let l = tags.length; l >= 1; l -= 1) {
    const command = cmds.find((c: Command) => {
      return R.equals(c.tag, tags.slice(0, l));
    });

    if (command) {
      return {
        command,
        args: tags.slice(l),
      };
    }
  }

  return {
    command: null,
    args: [],
  };
}
