import * as R from 'ramda';
import { Context, Command } from '../../types';


export default async function (args: string[], ctx: Context) {
  const cmdsWithDoc = ctx.cmds.filter(c => c.doc);

  const { embed } = generateMessage(cmdsWithDoc);
  await ctx.message.channel.send({ embed });
}


function generateMessage(commands: Command[]) {
  const cmdsHelp = parseModulesHelpText(commands);
  const cmdsValue = cmdsHelp.map(c => c.help);

  return {
    embed: {
      footer: { text: '[...] => Required | (...) => Optional' },
      fields: [{
        name: 'TopBot Commands',
        value: cmdsValue.join(' '),
      }],
    },
  };
}

function parseModulesHelpText(commands: Command[]) {
  const cmdsHelp = commands.map((cmd) => {
    return {
      module: cmd.tag[0],
      help: `**$${cmd.tag.join(' ')} ${cmd.doc.args.join(' ')}**\n${cmd.doc.description}\n\n`,
    };
  });

  return cmdsHelp.map((cmd, i, arr) => {
    const lastCmd = arr[i - 1];
    const separation = lastCmd && lastCmd.module !== cmd.module ? `\n` : '';

    return { ...cmd, help: separation + cmd.help };
  });
}
