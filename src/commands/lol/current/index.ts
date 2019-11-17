import { Command } from '../../../types'
import handler from './handler'
import schema from './schema'

const cmd: Command = {
  tag: ['lol', 'current2'],
  handler,
  validation: {
    schema,
    args: ['nickname'],
  },
  help: {
    description: 'Get current game info from you or from *nickname*',
  },
}

export default cmd
