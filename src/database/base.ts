import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Repository,
  FindConditions,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export abstract class BaseRepository<ET extends BaseEntity> extends Repository<ET> {
  /**
   * Tries to find an entity with the where conditions.
   * If not found creates a new one with where + defaults parameters
   */
  public async findOrCreate(where: FindConditions<ET>, defaults: any = {}): Promise<ET> {
    const instance = await this.findOne(where);
    if (instance) return instance as any;

    return this.insert({ ...where as Object, ...defaults }) as any;
  }
}
