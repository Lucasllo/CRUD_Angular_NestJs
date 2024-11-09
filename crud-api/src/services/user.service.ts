import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../dtos/user/create-user.dto";
import { UpdateUserDto } from "../dtos/user/update-user.dto";
import { LoginDto } from "src/dtos/auth/login/login.dto";
import { UserEntity } from "src/entities/user.entity";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserRepository } from "src/repositories/user.repository";

@Injectable()
export class UserService {
  private readonly dateWithoutTimezone = (date: Date) => {
    const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
    const withoutTimezone = new Date(date.valueOf() - tzoffset);
    return withoutTimezone;
  };

  users: UserEntity[] = [
    {
      id: 1,
      name: "lucas",
      lastName: "teste",
      email: "lucasteste@mailinator.com",
      dateBirth: this.dateWithoutTimezone(new Date("10/10/1995")),
      password: "$2b$10$Nq.tY4hK4ACZItSHQKAyWuF0bQEBW5o4JDPpvXm4DUmYuSAMAKWs2", //Asdf@1234
      gender: "Masculino",
      agree: true,
      playlists: [],
      createdAt: this.dateWithoutTimezone(new Date()),
      updatedAt: this.dateWithoutTimezone(new Date()),
      validatedEmail: true,
      active: true,
    },
    {
      id: 2,
      name: "david",
      lastName: "teste",
      email: "davidteste@mailinator.com",
      dateBirth: this.dateWithoutTimezone(new Date("11/11/1990")),
      password: "testee",
      gender: "Masculino",
      agree: true,
      playlists: [],
      createdAt: this.dateWithoutTimezone(new Date()),
      updatedAt: this.dateWithoutTimezone(new Date()),
      validatedEmail: true,
      active: true,
    },
  ];

  constructor(private readonly userRepository: UserRepository) {
    this.users.forEach((user) => {
      this.userRepository.create(user);
    });
  }

  async create(createUserDto: CreateUserDto) {
    const user: UserEntity = {
      ...createUserDto,
      dateBirth: this.dateWithoutTimezone(new Date(createUserDto.dateBirth)),
      id: Number((Math.random() * 100).toFixed(1)),
      validatedEmail: true,
      createdAt: this.dateWithoutTimezone(new Date()),
      updatedAt: this.dateWithoutTimezone(new Date()),
      playlists: [],
      password: await bcrypt.hash(
        createUserDto.password,
        await bcrypt.genSalt()
      ),
      active: true,
    };

    this.users.push(user);
    return createUserDto;
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  findOne(id: number) {
    return this.users.find((user) => user.id == id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) =>
      user.id === updateUserDto.id ? { ...user, ...updateUserDto } : user
    );
    return updateUserDto;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async login(loginDto: LoginDto) {
    const user = this.users.find((user) => user.email == loginDto.email);
    if (
      user != null &&
      (await bcrypt.compare(loginDto.password, user.password))
    ) {
      return user;
    } else {
      throw new UnauthorizedException("Email e/ou senha incorretos.");
    }
  }
}
