import * as Discord from 'discord.js';

import rank from './subcommands/rank';
import lost from './subcommands/lost';
import start from './subcommands/start';


export default async function(cmds: string[], message: Discord.Message): Promise<void> {
  switch (cmds[1]) {
    case 'rank': await rank(cmds, message); break;
    case 'lost': await lost(cmds, message); break;
    case 'start': await start(cmds, message); break;
  }
}
