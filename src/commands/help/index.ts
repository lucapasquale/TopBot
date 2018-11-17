import { Command } from '../../types';
import handler from './handler';

export default {
  tag: ['help'],
  handler,
  validation: {
    args: [],
  },
} as Command;
