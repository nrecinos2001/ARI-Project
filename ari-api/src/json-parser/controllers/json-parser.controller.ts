import { Body, Controller, Post } from '@nestjs/common';

import { ParseTextDto } from '../dto';
import { JsonParserService } from '../services';

@Controller('json-parser')
export class JsonParserController {
  constructor(private readonly jsonParserService: JsonParserService) {}
  @Post()
  async parseText(@Body() parseTextDto: ParseTextDto) {
    const response = this.jsonParserService.parse(parseTextDto);
    return response;
  }
}
