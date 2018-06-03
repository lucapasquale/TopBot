import * as Discord from 'discord.js';
import * as later from 'later';

import { CronCtx } from '../../types';
import cronjobs from './cronjobs';

export function startCrons(ctx: CronCtx) {
  cronjobs.map((cj) => {
    later.setInterval(() => {
      try {
        cj.handler(ctx);
      } catch (error) {
        console.log('Error trying to execute cronjob', {
          error,
          cronjob: cj,
        });
      }
    },                later.parse.text(cj.interval));
  });
}
