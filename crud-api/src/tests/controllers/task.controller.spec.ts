import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistController } from '../../controllers/course.controller';
import { PlaylistService } from '../../services/course.service';

describe('CourseController', () => {
  let controller: PlaylistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaylistController],
      providers: [PlaylistService],
    }).compile();

    controller = module.get<PlaylistController>(PlaylistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
