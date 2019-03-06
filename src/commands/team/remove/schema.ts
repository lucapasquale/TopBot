import * as Joi from 'joi'

export interface Args {
  game?: string
}

export default Joi.object({
  game: Joi.string().optional(),
}).required()
