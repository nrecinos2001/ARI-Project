import { Module } from '@nestjs/common';

import { JsonParserModule } from '@JsonParser/json-parser.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [JsonParserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
