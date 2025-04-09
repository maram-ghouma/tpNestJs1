import{Entity,PrimaryGeneratedColumn,Column,OneToMany} from 'typeorm';
import{Cv} from '../../cv/entities/cv.entity';
import { TimestampEntity } from '../../db/timestamp.entity';
@Entity()
export class User extends TimestampEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    username:string;
    @Column({unique: true})
    email:string;
    @Column()
    password:string;
    @OneToMany(
        () =>Cv,
        (cv:Cv) => cv.user,
        {eager: true}
        )
   cvs: Cv[];
}
