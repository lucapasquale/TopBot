import { Command } from '../../../types'
import handler from './handler'
import schema from './schema'

const cmd: Command = {
  handler,
  tag: ['stream', 'remove'],
  validation: {
    args: ['streamName'],
    schema,
  },
  help: {
    description: 'Removes *streamName* from the list of saved streams',
  },
}

export default cmd
