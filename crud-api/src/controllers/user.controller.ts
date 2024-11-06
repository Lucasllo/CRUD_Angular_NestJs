import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { Public } from '../decorators/public.decorator';
import { CreateUserDto } from '../dtos/user/create-user.dto';
import { AuthGuard } from '../guards/auth.guard';
import { UserService } from '../services/user.service';

UseGuards(AuthGuard);
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
