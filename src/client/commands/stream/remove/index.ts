import { Command } from '../../../../types';
import handler from './handler';

const cmd: Command = {
  handler,
  tag: ['stream', 'remove'],
  doc: {
    args: ['[stream_name]'],
    description: 'Removes *stream_name* from the list of saved streams',
  },
};

export default cmd;
