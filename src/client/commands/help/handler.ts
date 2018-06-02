import { Context, Command } from '../../../types';

export default async function (_: string[], ctx: Context) {
  const cmdsWithDoc = ctx.commands.filter(cmd => cmd.doc);

  const { embed } = generateMessage(cmdsWithDoc);
  await ctx.message.channel.send({ embed });
}

function generateMessage(commands: Command[]) {
  const cmdsHelp = parseModulesHelpText(commands);
  const cmdsValue = cmdsHelp.map(c => c.help);

  return {
    embed: {
      fields: [{
        name: 'TopBot Commands',
        value: cmdsValue.join(' '),
      }],
      footer: { text: '[...] => Required | (...) => Optional' },
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

    const isFromDifferentModule = lastCmd && lastCmd.module !== cmd.module;
    const separation = isFromDifferentModule ? `\n` : '';

    return { module: cmd.module, help: separation + cmd.help };
  });
}
