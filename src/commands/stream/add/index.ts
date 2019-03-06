import { Command } from '../../../types'
import handler from './handler'
import schema from './schema'

const cmd: Command = {
  tag: ['stream', 'add'],
  handler,
  validation: {
    schema,
    args: ['streamName', 'service'],
  },
  help: {
    description: `Start receiving notifications when *streamName* becomes online on twitch or mixer.
      Default is Twitch`,
  },
}

export default cmd
