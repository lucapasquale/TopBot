import { Command } from '../../../types'
import handler from './handler'
import schema from './schema'

const cmd: Command = {
  tag: ['team', 'remove'],
  handler,
  validation: {
    schema,
    args: ['game'],
  },
  help: {
    description: 'Remove yourself from list of players. *game* is optional',
  },
}

export default cmd
