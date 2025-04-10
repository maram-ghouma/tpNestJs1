import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { Cv2Controller } from './cv2.controller';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/middleware/auth/auth.module';

@Module({
  controllers: [CvController,Cv2Controller],
  providers: [CvService],
  imports:[TypeOrmModule.forFeature([Cv]),UserModule,AuthModule]
})
export class CvModule {}
