import { Controller, Post } from '@nestjs/common';

@Controller('json-parser')
export class JsonParserController {
  @Post()
  async parseText() {}
}
