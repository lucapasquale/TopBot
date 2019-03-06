import { Command } from '../../../types'
import handler from './handler'

const cmd: Command = {
  tag: ['lol', 'current'],
  handler,
  validation: {
    args: [],
  },
  help: {
    description: 'Get current game info',
  },
}

export default cmd
