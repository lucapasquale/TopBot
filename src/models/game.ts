import { Entity, Column, OneToMany } from 'typeorm';
import { BaseModel } from '../common/database/base-model';
import Player from './player';

@Entity()
export default class Game extends BaseModel<Game> {
  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @OneToMany(_ => Player, player => player.game)
  players: Player[];
}
