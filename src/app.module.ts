import { Module,MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CvModule } from './cv/cv.module';
import { Cv2Controller } from './cv/cv2.controller';
import { SkillModule } from './skill/skill.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Skill } from './skill/entities/skill.entity';
import { Cv } from './cv/entities/cv.entity';
import { User } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './middleware/auth/auth.middleware';
import { AuthModule } from './middleware/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileUploadInterceptor } from './Filtres/file-upload.interceptor';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),UserModule,AuthModule, CvModule, TypeOrmModule.forFeature([User]),SkillModule,TypeOrmModule.forRoot(
    {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'maram12345',
    database: 'testingdb',
    entities: [Skill,Cv,User],
    synchronize: true,
    }
    ),JwtModule.register({
      secret:process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/', // exposes everything inside "public/"
    }),
    ],
  controllers: [AppController],
  providers: [AppService,FileUploadInterceptor],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(Cv2Controller);
  } 
}
