import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GenericCrud } from '../generic/generic-crud.services';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends GenericCrud<User> {
    constructor(
            @InjectRepository(User)
            protected repository: Repository<User>
          ) {
            super(repository);
          }

    async findOne(email: string): Promise<User | null> {
        return await this.repository.findOne({ where: { email } });

}
}