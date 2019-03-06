import { Entity, Column, OneToMany } from 'typeorm'
import { BaseModel } from '../common/database/base-model'
import Player from './player'

@Entity()
export default class Game extends BaseModel<Game> {
  @Column()
  public name: string

  @Column({ unique: true })
  public code: string

  @OneToMany(_ => Player, player => player.game)
  public players: Player[]
}
