import { Command } from '../../../types';
import handler from './handler';
import schema from './schema';

const cmd: Command = {
  tag: ['stream', 'add'],
  handler,
  validation: {
    schema,
    args: ['name', 'service'],
  },
  doc: {
    args: ['[stream_name]', '(twitch | mixer)'],
    description:
      'Start receiving notifications when *stream_name* becomes' +
      ' online on *twitch* or *mixer*. Default is Twitch',
  },
};

export default cmd;
