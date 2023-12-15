import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(appController).toBeDefined();
    });
  });

  describe('GET /', () => {
    it('should return api info object', () => {
      const result = appController.getApiInfo();

      expect(result).toHaveProperty('project');
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('dbEngine');
      expect(result).toHaveProperty('api');
    });
  });
});
