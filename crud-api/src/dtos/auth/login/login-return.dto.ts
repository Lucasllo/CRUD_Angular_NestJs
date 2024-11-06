import { IsString } from 'class-validator';

export class LoginReturnDto {
  @IsString()
  token: string;

  @IsString()
  name?: string;
}
