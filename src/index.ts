import * as Discord from 'discord.js';

import { startDB } from './common/db';
import { getCommands, findHandler } from './common/helpers';
import { startClient } from './common/client';


run();

async function run() {
  const db = await startDB();
  const cmds = getCommands(`${__dirname}/cmds`);

  startClient(handleCommand);

  function handleCommand(message: Discord.Message) {
    const commandText = message.content.substring(1);

    const command = findHandler(commandText, cmds);
    if (!command) {
      return message.channel.send('Invalid command!');
    }

    const ctx = {
      message,
      db,
    };

    return command.handler([], ctx);
  }
}
