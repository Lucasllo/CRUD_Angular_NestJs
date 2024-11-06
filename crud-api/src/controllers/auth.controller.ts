import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/auth/login/login.dto';
import { LoginReturnDto } from '../dtos/auth/login/login-return.dto';
import { Public } from '../decorators/public.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from 'src/entities/user.entity';

@UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() loginAuthDto: LoginDto): Promise<LoginReturnDto> {
    return this.authService.login(loginAuthDto);
  }

  @Get('check')
  check(@User() user: UserEntity) {
    return user != null;
  }
}
