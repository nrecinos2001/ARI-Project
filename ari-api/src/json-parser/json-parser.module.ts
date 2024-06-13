import { Module } from '@nestjs/common';

import { JsonParserService } from './services';
import { JsonParserController } from './controllers';

@Module({
  providers: [JsonParserService],
  controllers: [JsonParserController],
})
export class JsonParserModule {}
