import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JsonParserModule } from './json-parser/json-parser.module';

@Module({
  imports: [JsonParserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
