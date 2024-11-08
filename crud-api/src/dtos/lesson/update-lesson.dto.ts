import { PartialType } from '@nestjs/mapped-types';
import { CreateVideoDto } from './create-lesson.dto';

export class UpdateVideoDto extends PartialType(CreateVideoDto) {}
