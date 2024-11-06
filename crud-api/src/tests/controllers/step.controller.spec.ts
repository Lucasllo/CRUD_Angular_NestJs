import { Test, TestingModule } from '@nestjs/testing';
import { LessonController } from '../../controllers/lesson.controller';
import { LessonService } from '../../services/lesson.service';

describe('LessonController', () => {
  let controller: LessonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonController],
      providers: [LessonService],
    }).compile();

    controller = module.get<LessonController>(LessonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
