import{Cv} from '../../cv/entities/cv.entity';
export class CreateUserDto {

        username: string;

        email: string;

        password: string;

        cvs: Cv[];
}
