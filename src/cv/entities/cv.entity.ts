import{Entity,PrimaryGeneratedColumn,Column, ManyToOne,ManyToMany,JoinTable} from 'typeorm';
import{User}from '../../user/entities/user.entity';
import{Skill}from '../../skill/entities/skill.entity';
import { TimestampEntity } from '../../db/timestamp.entity';
@Entity()
export class Cv extends TimestampEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    firstname:string;
    @Column()
    age:number;
    @Column()
    Cin:string;
    @Column()
    Job:string;
    @Column()
    path:string;
    @ManyToOne(
        ()=>User,
        (user:User)=>user.cvs,
        {eager:false}
    )
    user:User;
    @ManyToMany(() => Skill, (skill) => skill.cvs)
    @JoinTable({
        name: "cv_skills", 
        joinColumn: {
        name: "cv_id", 
        referencedColumnName: "id"
       },
        inverseJoinColumn: {
        name: "skill_id", 
        referencedColumnName: "id"
        }
        })
    skills:Skill[];

}
