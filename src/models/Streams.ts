import { Model, Column, Table } from 'sequelize-typescript';


@Table
export class Streams extends Model<Streams> {
  @Column
  token: string;

  @Column
  service: 'twitch' | 'mixer';

  @Column
  online: boolean;
}
