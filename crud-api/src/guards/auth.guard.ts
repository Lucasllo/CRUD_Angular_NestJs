import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly reflect: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const isPublic = this.reflect.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    try {
      const token = this.extractTokenFromHeader(request);
      if (token == undefined) {
        return false;
      }
      const data = JSON.parse(this.authService.checkToken(token)?.sub);
      request.user = await this.userService.findOne(Number(data.user));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  private extractTokenFromHeader(request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
