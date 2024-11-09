import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";
import { PlaylistService } from "../services/playlist.service";
import { CreatePlaylistDto } from "../dtos/playlist/create-playlist.dto";
import { AuthGuard } from "../guards/auth.guard";
import { User } from "../decorators/user.decorator";
import { UserEntity } from "../entities/user.entity";
import { Public } from "src/decorators/public.decorator";

UseGuards(AuthGuard);
@Controller("playlist")
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  create(
    @Body() createPlaylistDto: CreatePlaylistDto,
    @User() user: UserEntity
  ) {
    return this.playlistService.create(createPlaylistDto, user.id);
  }

  @Get("playlistsByUser")
  findAllByUser(
    @User() user: UserEntity,
    @Query() params: { page: number; pageSize: number }
  ) {
    return this.playlistService.findAllByUser(
      user.id,
      params.page,
      params.pageSize
    );
  }

  @Public()
  @Get()
  findAll() {
    return this.playlistService.findAll();
  }

  @Get("playlistsCategoryByUser")
  playlistsCategoryByUser(@User() user: UserEntity) {
    return this.playlistService.findAllCategoryByUser(user.id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.playlistService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePlaylistDto: CreatePlaylistDto,
    @User() user: UserEntity
  ) {
    return this.playlistService.update(+id, updatePlaylistDto, user.id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.playlistService.remove(+id);
  }
}
