import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseModel } from '../common/database/base-model';
import Game from './game';

@Entity()
export default class Player extends BaseModel<Player> {
  @Column()
  userId: string;

  @Column()
  username: string;

  @ManyToOne(_ => Game, game => game.players)
  game: Game;
}
