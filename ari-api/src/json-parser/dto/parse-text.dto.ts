import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

import { Separator } from '../enums';
import { ApiProperty } from '@nestjs/swagger';

export class ParseTextDto {
  @ApiProperty()
  @Type(() => String)
  @IsString({ each: true })
  @IsArray()
  text: string[];

  @ApiProperty()
  @IsEnum(Separator)
  @IsNotEmpty()
  separator: Separator;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  key: string;
}
