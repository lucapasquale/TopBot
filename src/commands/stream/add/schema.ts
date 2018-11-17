import * as Joi from 'joi';
import { servicesEnum } from '../../../models/stream';

export interface Args {
  streamName: string;
  service: 'twitch' | 'mixer';
}

export default Joi.object({
  streamName: Joi.string().required(),
  service: Joi.string()
    .valid(servicesEnum)
    .default('twitch'),
}).required();
