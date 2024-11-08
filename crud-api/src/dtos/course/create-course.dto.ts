import { CreateVideoDto } from '../lesson/create-lesson.dto';

export class CreatePlaylistDto {
  id: number;

  name: string;

  category: string;

  videos: CreateVideoDto[];
}
