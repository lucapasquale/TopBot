import { Entity, Column, EntityRepository } from 'typeorm';
import { BaseEntity, BaseRepository } from '../base';

@Entity()
export class LolPlayer extends BaseEntity {
  @Column({ unique: true })
  userId: string;

  @Column()
  username: string;
}

@EntityRepository(LolPlayer)
export class LolPlayerRepository extends BaseRepository<LolPlayer> {}
