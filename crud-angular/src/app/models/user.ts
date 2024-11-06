import { Gender } from '../enum/gender.enum';

export interface User {
  id?: number;
  name: string;
  lastName: string;
  dateBirth: Date;
  email: string;
  password: string;
  gender: Gender;
  agree: boolean;
}
