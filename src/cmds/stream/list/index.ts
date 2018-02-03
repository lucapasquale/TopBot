import { Command } from '../../../types';
import handler from './handler';

const cmd: Command = {
  handler,
  tag: ['stream', 'list'],
};

export default cmd;
