import { Entity, Index, Column, EntityRepository } from 'typeorm';
import { BaseEntity, BaseRepository } from '../base';

@Entity()
@Index(['token', 'service'], { unique: true })
export class Stream extends BaseEntity {
  @Column()
  token: string;

  @Column({
    type: 'enum',
    enum: ['twitch', 'mixer'],
    default: 'twitch',
  })
  service: string;

  @Column({ default: false })
  online: boolean;
}

@EntityRepository(Stream)
export class StreamRepository extends BaseRepository<Stream> {}
