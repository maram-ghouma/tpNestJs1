import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { GenericCrud } from '../generic/generic-crud.services';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillService extends GenericCrud<Skill>{

}
