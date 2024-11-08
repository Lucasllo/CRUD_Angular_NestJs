import { Test, TestingModule } from '@nestjs/testing';
import { VideoController } from '../../controllers/lesson.controller';
import { VideoService } from '../../services/lesson.service';

describe('LessonController', () => {
  let controller: VideoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoController],
      providers: [VideoService],
    }).compile();

    controller = module.get<VideoController>(VideoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
