import { Command } from '../../../types';
import handler from './handler';

const cmd: Command = {
  handler,
  tag: ['help'],
};

export default cmd;
