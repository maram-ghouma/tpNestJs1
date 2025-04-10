import { Injectable, CanActivate, ExecutionContext, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { request } from 'http';
@Injectable()
export class adminGuard implements CanActivate {
  constructor(@Inject(UserService) private uService:UserService,@Inject(JwtService) private jwtService : JwtService){}
  async canActivate(context: ExecutionContext):  Promise<boolean> {
    const req= context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        throw new UnauthorizedException('Authorization header missing');
    }
    const token =authHeader.split(' ')[1];
    if(!token){
        throw new UnauthorizedException('JWT token missing');
    }
    try{
        const decoded = this.jwtService.verify(token);
        const user = await this.uService.findOne(decoded.email);
        if(!user){throw new UnauthorizedException('User not found');}
        if(user.role==='admin'){
            req.user=user;
            return true;
        }
        return false;
    }
    catch (e) {
        console.error('JWT error', e); 
        throw new UnauthorizedException('Invalid or expired token');
      }
  }
}
