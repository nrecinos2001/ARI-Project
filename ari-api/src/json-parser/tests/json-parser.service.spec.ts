import { Test, TestingModule } from '@nestjs/testing';
import { JsonParserService } from '../services';

describe('JsonParserService', () => {
  let service: JsonParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonParserService],
    }).compile();

    service = module.get<JsonParserService>(JsonParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
