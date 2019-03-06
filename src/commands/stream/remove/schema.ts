import * as Joi from 'joi'

export interface Args {
  streamName: string
}

export default Joi.object({
  streamName: Joi.string().required(),
}).required()
