import { IsOptional, IsString, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
export class SearchCvDto{
    @IsOptional()
    @IsString()
    critere? : string;
    @IsOptional()
    @IsInt()
    @Transform(({value})=>parseInt(value,10))
    age?:number;


}