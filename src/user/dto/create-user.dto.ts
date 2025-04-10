import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class CreateUserDto {
        @IsString()
        @IsNotEmpty()
        username: string;
      
        @IsEmail()
        @IsNotEmpty()
        email: string;
      
        @IsString()
        @MinLength(6)
        password: string;
      
        @IsString()
        @IsNotEmpty()
        role: string;
}
