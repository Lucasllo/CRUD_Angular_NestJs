import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaylistDto } from './create-course.dto';

export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {}
