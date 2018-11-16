import { Entity, Column } from 'typeorm';
import { BaseModel } from '../base-model';

@Entity()
export default class LolPlayer extends BaseModel<LolPlayer> {
  @Column({ unique: true })
  userId: string;

  @Column()
  username: string;

  @Column()
  game: string;
}
