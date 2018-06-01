import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Stream {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  service: 'twitch' | 'mixer';

  @Column()
  online: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
