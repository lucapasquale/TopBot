import { Command } from '../../../types'
import handler from './handler'
import schema from './schema'

const cmd: Command = {
  tag: ['team', 'find'],
  handler,
  validation: {
    schema,
    args: ['game'],
  },
  help: {
    description: 'Find available players for a *game*',
  },
}

export default cmd
