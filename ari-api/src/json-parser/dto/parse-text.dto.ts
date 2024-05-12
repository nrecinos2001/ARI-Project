import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

import { Separator } from '../enums';

export class ParseTextDto {
  @IsString()
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  text: string[];

  @IsEnum(Separator)
  @IsNotEmpty()
  separator: Separator;
}
