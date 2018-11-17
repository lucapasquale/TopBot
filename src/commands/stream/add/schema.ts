import * as Joi from 'joi';
import { servicesEnum } from '../../../models/stream';

export default Joi.object({
  name: Joi.string().required(),
  service: Joi.string()
    .valid(servicesEnum)
    .default('twitch'),
}).required();
