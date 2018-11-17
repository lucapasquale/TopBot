import { Command } from '../../../types';
import handler from './handler';

const cmd: Command = {
  handler,
  tag: ['stream', 'list'],
  validation: {
    args: [],
  },
  doc: {
    args: [],
    description: 'Lists all saved streams',
  },
};

export default cmd;
