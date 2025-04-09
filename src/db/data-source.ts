import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Cv } from '../cv/entities/cv.entity';
import { Skill } from '../skill/entities/skill.entity';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'maram12345',
    database: 'testingdb',
    synchronize: true,
    entities: [User, Cv, Skill], // List of your entities

});
