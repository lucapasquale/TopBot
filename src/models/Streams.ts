import { Model, Column, Table, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';


@Table
export class Streams extends Model<Streams> {
  @Column
  token: string;

  @Column
  service: 'twitch' | 'mixer';

  @Column
  online: boolean;


  // @CreatedAt
  // @Column
  // createdAt: Date;

  // @UpdatedAt
  // @Column
  // updatedAt: Date;

  // @DeletedAt
  // @Column
  // deletedAt: Date;
}
