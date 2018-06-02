import { EntityRepository, Repository } from 'typeorm';
import { LolPlayer } from './entities/LolPlayer';
import { Stream } from './entities/Stream';

@EntityRepository(LolPlayer)
export class LolPlayerRepository extends Repository<LolPlayer> {
  async upsert(where: any, defaults: any = {}) {
    const instance = await this.findOne(where);
    return instance || await this.insert({ ...where, ...defaults });
  }
}

@EntityRepository(Stream)
export class StreamRepository extends Repository<Stream> {
  async upsert(where: any, defaults: any = {}) {
    const instance = await this.findOne(where);
    return instance || await this.insert({ ...where, ...defaults });
  }
}
