import { Test, TestingModule } from '@nestjs/testing';
import { JsonParserController } from '../controllers';

describe('JsonParserController', () => {
  let controller: JsonParserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JsonParserController],
    }).compile();

    controller = module.get<JsonParserController>(JsonParserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
