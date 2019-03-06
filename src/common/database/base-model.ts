import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  FindConditions,
} from 'typeorm'

export abstract class BaseModel<T> extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  public update(entity: Partial<T>) {
    Object.keys(entity).forEach(key => {
      this[key] = entity[key]
    })

    return this.save()
  }

  public static async findOrCreate<T extends BaseEntity>(
    where: FindConditions<T>,
    defaults: any = {}
  ): Promise<T> {
    const instance = await this.findOne(where as any)
    if (instance) {
      return instance as any
    }

    return this.insert({
      ...(where as object),
      ...defaults,
    }) as any
  }
}
