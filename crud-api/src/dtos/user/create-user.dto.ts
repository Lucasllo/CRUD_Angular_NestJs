export class CreateUserDto {
  id?: number;
  name: string;
  lastName: string;
  dateBirth: Date;
  email: string;
  password: string;
  gender: string;
  agree: boolean;
}
