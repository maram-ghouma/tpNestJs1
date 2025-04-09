import { NotFoundException } from '@nestjs/common';
import { FindManyOptions, Repository,ObjectLiteral } from 'typeorm';
import { PaginationDto } from './paginationDto.dto';

export abstract class GenericCrud<T extends ObjectLiteral>  {
  constructor(protected repository: Repository<T>) {}
  async getAll(paginationDto:PaginationDto):Promise <{items:T[];meta:any}>{
    const page= paginationDto.page||1;
    const limit = paginationDto.limit || 10;
    const skip=(page-1)*limit;
    const [items ,total]=await this.repository.findAndCount({
      skip,
      take: limit,
      order: {created_at: 'DESC'} as any,
    }) ;
    return {
      items,
      meta:{
        page,
        total,
        limit,
        totalPages: Math.ceil(total/limit),
        hasNextPage: page< Math.ceil(total/limit),
        hasPreviousPage: page > 1
      }
      };
    };

  find(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  create(addT): Promise<T> {
    return this.repository.save(addT);
  }
  async update(id, updateTDto) {
    const newPerson = await this.repository.preload({
      id,
      ...updateTDto,
    });
    if (!newPerson) {
      throw new NotFoundException('T innexistante');
    }
    return this.repository.save(newPerson);
  }
  async remove(id, updateTDto) {
    const newPerson = await this.repository.preload({
      id,
      ...updateTDto,
    });
    if (!newPerson) {
      throw new NotFoundException('T innexistante');
    }
    return this.repository.remove(newPerson);
  }
}