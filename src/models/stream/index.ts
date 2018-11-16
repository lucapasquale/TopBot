import { Entity, Index, Column } from 'typeorm';
import { BaseModel } from '../base-model';

@Entity()
@Index(['token', 'service'], { unique: true })
export default class Stream extends BaseModel<Stream> {
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
