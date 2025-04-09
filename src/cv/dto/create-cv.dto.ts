import{User}from '../../user/entities/user.entity';
import{Skill}from '../../skill/entities/skill.entity';
export class CreateCvDto {
        name:string;

        firstname:string;

        age:number;

        Cin:string;

        Job:string;

        path:string;
        user:User;
        skills:Skill[];
}
