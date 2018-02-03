import { Model, Column, Table } from 'sequelize-typescript';


@Table
export class LolPlayer extends Model<LolPlayer> {
  @Column
  userId: string;

  @Column
  username: string;
}
