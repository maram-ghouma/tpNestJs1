import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtService: JwtService) {}

    async login(email: string, password: string) {
        const user = await this.usersService.findOne(email);
        if (!user || user.password !== password) { 
            throw new Error('Invalid credentials');
        }

        // Generate a JWT token
        const payload = { id: user.id, email: user.email };
        const token = this.jwtService.sign(payload);

        return { access_token: token };
    }
}
