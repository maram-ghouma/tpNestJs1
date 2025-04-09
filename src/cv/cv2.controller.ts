import { Controller, Get, Post,Req, Body, Patch, Param, Delete,UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Query } from '@nestjs/common';
import { SearchCvDto } from './dto/search-cv.dto';
import { User } from 'src/user/entities/user.entity';
import { PaginationDto } from 'src/generic/paginationDto.dto';
import { FileUploadInterceptor } from '../Filtres/file-upload.interceptor'; 
@Controller({
  path:'cv',
  version:'2',
})
export class Cv2Controller {
    constructor(private readonly cvService: CvService) {}
  
    @Post()
create(@Body() createCvDto: CreateCvDto, @Req() req) {
  // Attach the user ID from token
  console.log('User ID from token:', req.userId);
  createCvDto.user = { id: req.userId } as User;

  return this.cvService.create(createCvDto);
}
@Post('upload')
  @UseInterceptors(FileUploadInterceptor.imageInterceptor())
  async uploadCvImage(@UploadedFile() file: Express.Multer.File,@Body() body: { cvId: number }) {
    if (!file) {
      throw new BadRequestException('No valid image uploaded');
    }
    const path = file.path;
    const updatedCv = await this.cvService.addImageToCv(body.cvId, path);
    return {
      message: 'Image uploaded successfully',
      cv:updatedCv,
    };
  }
  
   /* @Get(':chaine/:age')
  findAll(@Param('chaine') chaine: string, @Param('age') age: string) {
    return this.cvService.findspecific(chaine, +age);
  }
  
  @Get(':chaine')
  findAllWithoutAge(@Param('chaine') chaine: string) {
    return this.cvService.findspecific(chaine, 0);
  }
  */
  @Get()
  findAllWithoutParams(@Query() dto:PaginationDto) {
    return this.cvService.getAll(dto);
  }
  
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.cvService.find({where: {id:+id}});
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto) {
      return this.cvService.update(+id, updateCvDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string,@Body() updateCvDto:UpdateCvDto) {
      return this.cvService.remove(+id,updateCvDto);
    }
  }
