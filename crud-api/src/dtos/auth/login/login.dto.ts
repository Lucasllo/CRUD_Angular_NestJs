import { IsString, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @IsString()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;
}
