import { Command } from '../../../types';
import handler from './handler';

const cmd: Command = {
  handler,
  tag: ['stream', 'add'],
  doc: {
    args: ['[stream_name]', '(twitch | mixer)'],
    description:
      'Start receiving notifications when *stream_name* becomes' +
      ' online on *twitch* or *mixer*. Default is Twitch',
  },
};

export default cmd;
