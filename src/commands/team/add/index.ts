import { Command } from '../../../types'
import handler from './handler'
import schema from './schema'

const cmd: Command = {
  tag: ['team', 'add'],
  handler,
  validation: {
    schema,
    args: ['game'],
  },
  help: {
    description:
      'Add yourself to be notified when a player is needed for a *game*',
  },
}

export default cmd
