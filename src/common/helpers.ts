import * as fs from 'fs';
import * as path from 'path';
import * as R from 'ramda';
import * as Discord from 'discord.js';
import { Command } from '../types';


export function getAllCommands(commandsPath: string) {
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


export function parseCommandText(messageText: string, cmds: Command[]) {
  const removedPreffix = messageText.substring(1);
  const tags = removedPreffix.split(' ');

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

export function getDefaultChannels(channels: Discord.Channel[]) {
  return {
    text: channels.find((c: Discord.Channel) => c.type === 'text') as Discord.TextChannel,
    voice: channels.find((c: Discord.Channel) => c.type === 'voice') as Discord.VoiceChannel,
  };
}
