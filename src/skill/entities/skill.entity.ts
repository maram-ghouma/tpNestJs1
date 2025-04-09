import { Cv } from '../../cv/entities/cv.entity';
import{Entity,PrimaryGeneratedColumn,Column,ManyToMany} from 'typeorm';
import { TimestampEntity } from '../../db/timestamp.entity';
@Entity()
export class Skill extends TimestampEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    designation:string;
    @ManyToMany(() => Cv, (cv) => cv.skills)
    cvs:Cv[];

}
