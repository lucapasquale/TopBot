import * as Joi from 'joi'

export interface Args {
  nickname: string
}

export default Joi.object({
  nickname: Joi.string(),
}).required()
