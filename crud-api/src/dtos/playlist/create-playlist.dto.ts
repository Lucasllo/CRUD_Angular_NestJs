import { CreateVideoDto } from "../video/create-video.dto";

export class CreatePlaylistDto {
  id: number;

  name: string;

  category: string;

  videos: CreateVideoDto[];
}
