import { Entity, Index, Column } from 'typeorm';
import { BaseModel } from '../common/database/base-model';

export const servicesEnum = ['twitch', 'mixer'];

@Entity()
@Index(['name', 'service'], { unique: true })
export default class Stream extends BaseModel<Stream> {
  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: servicesEnum,
    default: 'twitch',
  })
  service: string;

  @Column({ default: false })
  online: boolean;
}
