import { Test, TestingModule } from "@nestjs/testing";
import { PlaylistController } from "../../controllers/playlist.controller";
import { PlaylistService } from "../../services/playlist.service";

describe("PlaylistController", () => {
  let controller: PlaylistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaylistController],
      providers: [PlaylistService],
    }).compile();

    controller = module.get<PlaylistController>(PlaylistController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
