import { Entity, Index, Column } from 'typeorm'
import { BaseModel } from '../common/database/base-model'

export const servicesEnum = ['twitch', 'mixer']

@Entity()
@Index(['name', 'service'], { unique: true })
export default class Stream extends BaseModel<Stream> {
  @Column()
  public name: string

  @Column({
    type: 'enum',
    enum: servicesEnum,
    default: 'twitch',
  })
  public service: string

  @Column({ default: false })
  public online: boolean
}
