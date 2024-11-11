import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from '../dtos/auth/create-auth.dto';
import { UpdateAuthDto } from '../dtos/auth/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dtos/auth/login/login.dto';
import { LoginReturnDto } from '../dtos/auth/login/login-return.dto';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'user';

  constructor(
    private readonly userservice: UserService,
    private readonly jwtService: JwtService,
  ) {}

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  checkToken(token: string) {
    return this.checkInToken(token);
  }

  private checkInToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.audience,
        issuer: this.issuer,
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(loginAuthDto: LoginDto): Promise<LoginReturnDto> {
    const user = await this.userservice.login(loginAuthDto);
    const token = this.createToken(user.id);
    return {
      name: user.name,
      ...token,
    };
  }

  private createToken(id: number) {
    return {
      token: this.jwtService.sign(
        {},
        {
          expiresIn: '7 days',
          subject: JSON.stringify({
            user: String(id),
          }),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }
}
