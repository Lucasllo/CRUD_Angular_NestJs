import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistService } from '../../services/course.service';

describe('CourseService', () => {
  let service: PlaylistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaylistService],
    }).compile();

    service = module.get<PlaylistService>(PlaylistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
