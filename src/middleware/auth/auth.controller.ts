import { Controller, Post, Body ,UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/user/dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto:LoginDto) {
        return this.authService.login(loginDto.email,loginDto.password);
    }
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto){
        return this.authService.register(createUserDto);
    }
    @UseGuards(JwtAuthGuard)
    @Post('protected')
    protectedRoute() {
      return { message: 'You have access to this protected route!' };
    }
}
