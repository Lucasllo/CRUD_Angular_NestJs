import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user/create-user.dto';
import { UpdateUserDto } from '../dtos/user/update-user.dto';
import { LoginDto } from 'src/dtos/auth/login/login.dto';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  private dateWithoutTimezone = (date: Date) => {
    const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
    const withoutTimezone = new Date(date.valueOf() - tzoffset);
    return withoutTimezone;
  };

  users: UserEntity[] = [
    {
      id: 1,
      name: 'lucas',
      lastName: 'teste',
      email: 'lucasteste@mailinator.com',
      dateBirth: this.dateWithoutTimezone(new Date('10/10/1995')),
      password: 'Asdf@1234',
      gender: 'Masculino',
      agree: true,
      courses: [],
      createdAt:this.dateWithoutTimezone(new Date()),
      updatedAt:this.dateWithoutTimezone(new Date()),
      validatedEmail: true,
    },
    {
      id: 2,
      name: 'david',
      lastName: 'teste',
      email: 'davidteste@mailinator.com',
      dateBirth: this.dateWithoutTimezone(new Date('11/11/1990')),
      password: 'testee',
      gender: 'Masculino',
      agree: true,
      courses: [],
      createdAt: this.dateWithoutTimezone(new Date()),
      updatedAt:this.dateWithoutTimezone(new Date()),
      validatedEmail: true,
    },
  ];
  

  create(createUserDto: CreateUserDto) {
    console.log(typeof createUserDto.dateBirth)
    const user: UserEntity = {
      ...createUserDto,
      dateBirth: this.dateWithoutTimezone(new Date(createUserDto.dateBirth)),
      id: Number((Math.random() * 100).toFixed(1)),
      validatedEmail: true,
      createdAt:this.dateWithoutTimezone(new Date()),
      updatedAt:this.dateWithoutTimezone(new Date()),
      courses: [],
    };

    this.users.push(user);
    return createUserDto;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id == id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) =>
      user.id === updateUserDto.id ? { ...user, ...updateUserDto } : user
    )
    return updateUserDto;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  login(loginDto: LoginDto) {
    return this.users.find(
      (user) =>
        user.email == loginDto.email && user.password == loginDto.password,
    );
  }
}
