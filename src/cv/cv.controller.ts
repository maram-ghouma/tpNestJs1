import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Query } from '@nestjs/common';
import { SearchCvDto } from './dto/search-cv.dto';

@Controller({
  path:'cv',
  version:'1',
})

export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  create(@Body() createCvDto: CreateCvDto) {
    return this.cvService.create(createCvDto);
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
findAllWithoutParams(@Query() dto:SearchCvDto) {
  return this.cvService.findspecific(dto.critere? dto.critere:'', dto.age? dto.age:0);
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
