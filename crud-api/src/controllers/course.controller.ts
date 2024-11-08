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
} from '@nestjs/common';
import { CourseService } from '../services/course.service';
import { CreateCourseDto } from '../dtos/course/create-course.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { UserEntity } from '../entities/user.entity';

UseGuards(AuthGuard);
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto, @User() user: UserEntity) {
    return this.courseService.create(createCourseDto, user.id);
  }

  @Get('coursesByUser')
  findAllByUser(@User() user: UserEntity, @Query() params:{page: number, pageSize: number}) {
    return this.courseService.findAllByUser(user.id, params.page, params.pageSize);
  }

  @Get('coursesCategoryByUser')
  coursesCategoryByUser(@User() user: UserEntity) {
    return this.courseService.findAllCategoryByUser(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseDto: CreateCourseDto,
    @User() user: UserEntity,
  ) {
    return this.courseService.update(+id, updateCourseDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
