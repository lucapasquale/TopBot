import { CommandCtx, Command } from '../../types'

export default async function(_, ctx: CommandCtx) {
  const cmdsWithHelp = ctx.commands.filter(
    cmd => cmd.help && cmd.help.description
  )

  const { embed } = generateMessage(cmdsWithHelp)
  await ctx.message.channel.send({ embed })
}

function generateMessage(commands: Command[]) {
  const cmdsHelp = parseModulesHelpText(commands)
  const cmdsValue = cmdsHelp.map(c => c.help)

  return {
    embed: {
      fields: [
        {
          name: 'TopBot Commands',
          value: cmdsValue.join(' '),
        },
      ],
    },
  }
}

function parseModulesHelpText(commands: Command[]) {
  const cmdsHelp = commands.map(cmd => {
    const args = cmd.validation.args.map(arg => `(*${arg}*)`)
    return {
      module: cmd.tag[0],
      help: `**$${cmd.tag.concat(args).join(' ')}**\n${
        cmd.help.description
      }\n\n`,
    }
  })

  return cmdsHelp.map((cmd, i, arr) => {
    const lastCmd = arr[i - 1]

    const isFromDifferentModule = lastCmd && lastCmd.module !== cmd.module
    const separation = isFromDifferentModule ? `\n` : ''

    return { module: cmd.module, help: separation + cmd.help }
  })
}
