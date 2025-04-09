import { Injectable, NotFoundException } from '@nestjs/common';
import { GenericCrud } from '../generic/generic-crud.services';
import { Cv } from './entities/cv.entity';
import { Like, Equal,Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class CvService extends GenericCrud<Cv> {
    constructor(
        @InjectRepository(Cv)
        protected repository: Repository<Cv>
      ) {
        super(repository);
      }
  findspecific(chaine: string, age: number) {
    if (!chaine && age==0) {
      return this.find();
    }

    if (!chaine) {
      return this.repository.find({
        where: { age: Equal(age) },
      });
    }

    if (age==0) {
      return this.repository.find({
        where: [
          { name: Like(`%${chaine}%`) }, 
          { firstname: Like(`%${chaine}%`) }, 
          { Job: Like(`%${chaine}%`) }
        ],
      });
    }

    return this.repository.find({
      where: [
        { name: Like(`%${chaine}%`) },
        { firstname: Like(`%${chaine}%`) },
        { Job: Like(`%${chaine}%`) },
        { age: Equal(age) },
      ],
    });
  }
  async addImageToCv(cvId: number, imagePath: string): Promise<Cv> {
    const cv = await this.repository.findOneBy({ id: cvId });
  
    if (!cv) {
      throw new NotFoundException(`CV with id ${cvId} not found`);
    }
  
    cv.path = imagePath;
  
    return this.repository.save(cv); 
  }
}
