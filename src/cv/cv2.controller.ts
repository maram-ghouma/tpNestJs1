import {Controller,Get,Post,Body,Patch,Param,Delete,Req,Query,UploadedFile,UseInterceptors,UseGuards,BadRequestException,ForbiddenException,NotFoundException,} from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { PaginationDto } from 'src/generic/paginationDto.dto';
import { FileUploadInterceptor } from '../Filtres/file-upload.interceptor';
import { JwtAuthGuard } from 'src/middleware/auth/auth.guard';
import { adminGuard } from 'src/middleware/auth/admin.guard';
import { User as userDecorator } from 'src/middleware/auth/user.decorator';
import { User } from 'src/user/entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller({
  path: 'cv',
  version: '2',
})
export class Cv2Controller {
  constructor(private readonly cvService: CvService) {}

  @Post()
  create(@Body() createCvDto: CreateCvDto, @userDecorator() user: User) {
    createCvDto.user = user;
    return this.cvService.create(createCvDto);
  }
    @Post('upload')
    @UseInterceptors(FileUploadInterceptor.imageInterceptor())
    async uploadCvImage(
      @UploadedFile() file: Express.Multer.File,
      @Body() body: { cvId: number },
      @userDecorator() user: User,
    ) {
      if (!file) {
        throw new BadRequestException('No valid image uploaded');
      }
    
      const cv = await this.cvService.findOne({
        where: { id: body.cvId },
        relations: ['user']
      });
    
      if (!cv) {
        throw new NotFoundException('CV not found');
      }
    
      if (user.role !== 'admin' && cv.user && cv.user.id !== user.id) {
        throw new ForbiddenException("You can't upload an image to this CV");
      }
    
      const path = file.path;
      const updatedCv = await this.cvService.addImageToCv(body.cvId, path);
    
      return {
        message: 'Image uploaded successfully',
        cv: updatedCv,
      };
    }
  
 

  @UseGuards(adminGuard)
  @Get('pagination')
  findAllWithoutParams(@Query() dto: PaginationDto) {
    return this.cvService.getAll(dto);
  }

  @UseGuards(adminGuard)
  @Get('getAll')
  findAllAdmin() {
    return this.cvService.find();
  }

  @Get()
  findAllByUser(@userDecorator() user: User) {
    if (user.role === 'admin') {
      return this.cvService.find();
    }
    return this.cvService.findByUserId(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @userDecorator() user: User) {
    const cv = await this.cvService.find({ where: { id: +id } });

    if (!cv || !cv[0]) throw new NotFoundException('CV not found');

    if (user.role !== 'admin' && cv[0].user.id !== user.id) {
      throw new ForbiddenException("You can't access this CV");
    }

    return cv[0];
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCvDto: UpdateCvDto,
    @userDecorator() user: User,
  ) {
    const cv = await this.cvService.find({ where: { id: +id } });

    if (!cv || !cv[0]) throw new NotFoundException('CV not found');

    if (user.role !== 'admin' && cv[0].user.id !== user.id) {
      throw new ForbiddenException("You can't update this CV");
    }

    return this.cvService.update(+id, updateCvDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @userDecorator() user: User,
    @Body() updateCvDto: UpdateCvDto,
  ) {
    const cv = await this.cvService.find({ where: { id: +id } });

    if (!cv || !cv[0]) throw new NotFoundException('CV not found');

    if (user.role !== 'admin' && cv[0].user.id !== user.id) {
      throw new ForbiddenException("You can't delete this CV");
    }

    return this.cvService.remove(+id, updateCvDto);
  }
}
