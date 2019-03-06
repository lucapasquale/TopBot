import { Entity, Column } from 'typeorm'
import { BaseModel } from '../common/database/base-model'

@Entity()
export default class LolPlayer extends BaseModel<LolPlayer> {
  @Column()
  public userId: string

  @Column()
  public nickname: string
}
