import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../dtos/user/create-user.dto";
import { UpdateUserDto } from "../dtos/user/update-user.dto";
import { LoginDto } from "../dtos/auth/login/login.dto";
import { UserEntity } from "../entities/user.entity";
import * as bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository";

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
      playlists: [{
        id: 4,
        category: "testando",
        name: "nova tarefa usuario 2",
        videos: [
          {
            id: 5,
            name: "testar novamente",
            youtubeUrl: "7hHZnvjCbVw",
            playlistId: 4,
          },
        ],
        userId: 1,
      },
      {
        id: 5,
        category: "testando",
        name: "teste demo usuario",
        videos: [
          { id: 6, name: "demo", youtubeUrl: "m3lF2qEA2cw", playlistId: 5 },
        ],
        userId: 1,
      },
      {
        id: 6,
        category: "testando",
        name: "teste demo usuario 2",
        videos: [
          { id: 7, name: "demo 2", youtubeUrl: "OBmlCZTF4Xs", playlistId: 6 },
        ],
        userId: 1,
      },
      {
        id: 7,
        category: "testando",
        name: "tarefa demo usuario",
        videos: [
          { id: 8, name: "demo ", youtubeUrl: "7hHZnvjCbVw", playlistId: 7 },
          { id: 9, name: "demo 2", youtubeUrl: "OBmlCZTF4Xs", playlistId: 7 },
        ],
        userId: 1,
      },
      {
        id: 11,
        category: "testando",
        name: "nova tarefa usuario",
        videos: [
          {
            id: 14,
            name: "testar novamente",
            youtubeUrl: "7hHZnvjCbVw",
            playlistId: 11,
          },
        ],
        userId: 1,
      },
      {
        id: 12,
        category: "testando",
        name: "teste demo usuario",
        videos: [
          { id: 15, name: "demo", youtubeUrl: "m3lF2qEA2cw", playlistId: 12 },
        ],
        userId: 1,
      },
      {
        id: 13,
        category: "testando",
        name: "teste demo usuario 3",
        videos: [
          { id: 16, name: "demo 2", youtubeUrl: "OBmlCZTF4Xs", playlistId: 13 },
        ],
        userId: 1,
      },
      {
        id: 14,
        category: "testando",
        name: "tarefa demo usuario",
        videos: [
          { id: 17, name: "demo ", youtubeUrl: "7hHZnvjCbVw", playlistId: 14 },
          { id: 18, name: "demo 2", youtubeUrl: "OBmlCZTF4Xs", playlistId: 14 },
        ],
        userId: 1,
      },
      {
        id: 18,
        category: "testando",
        name: "nova tarefa usuario",
        videos: [
          {
            id: 23,
            name: "testar novamente",
            youtubeUrl: "7hHZnvjCbVw",
            playlistId: 18,
          },
        ],
        userId: 1,
      },
      {
        id: 19,
        category: "testando",
        name: "teste demo usuario",
        videos: [
          { id: 24, name: "demo", youtubeUrl: "m3lF2qEA2cw", playlistId: 19 },
        ],
        userId: 1,
      },
      {
        id: 20,
        category: "testando",
        name: "teste demo usuario 3",
        videos: [
          { id: 25, name: "demo 2", youtubeUrl: "OBmlCZTF4Xs", playlistId: 20 },
        ],
        userId: 1,
      },
      {
        id: 21,
        category: "testando",
        name: "tarefa demo usuario",
        videos: [
          { id: 26, name: "demo ", youtubeUrl: "7hHZnvjCbVw", playlistId: 21 },
          { id: 27, name: "demo 2", youtubeUrl: "OBmlCZTF4Xs", playlistId: 21 },
        ],
        userId: 1,
      },],
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
      playlists: [{
        id: 1,
        category: "testando",
        name: "teste usuario",
        videos: [
          { id: 1, name: "testar", youtubeUrl: "OBmlCZTF4Xs", playlistId: 1 },
        ],
        userId: 2,
      },
      {
        id: 2,
        category: "testando",
        name: "teste usuario 2",
        videos: [
          {
            id: 2,
            name: "testar novamente",
            youtubeUrl: "7hHZnvjCbVw",
            playlistId: 2,
          },
        ],
        userId: 2,
      },
      {
        id: 3,
        category: "testando",
        name: "nova tarefa usuario",
        videos: [
          { id: 3, name: "testar ", youtubeUrl: "m3lF2qEA2cw", playlistId: 3 },
          { id: 4, name: "testar 2", youtubeUrl: "7hHZnvjCbVw", playlistId: 3 },
        ],
        userId: 2,
      },
      {
        id: 8,
        category: "testando",
        name: "teste usuario 2",
        videos: [
          { id: 10, name: "testar", youtubeUrl: "OBmlCZTF4Xs", playlistId: 8 },
        ],
        userId: 2,
      },
      {
        id: 9,
        category: "testando",
        name: "teste 2 usuario 2",
        videos: [
          {
            id: 11,
            name: "testar novamente",
            youtubeUrl: "7hHZnvjCbVw",
            playlistId: 9,
          },
        ],
        userId: 2,
      },
      {
        id: 10,
        category: "testando",
        name: "nova tarefa usuario 3",
        videos: [
          { id: 12, name: "testar ", youtubeUrl: "m3lF2qEA2cw", playlistId: 10 },
          { id: 13, name: "testar 2", youtubeUrl: "7hHZnvjCbVw", playlistId: 10 },
        ],
        userId: 2,
      },
    {
      id: 15,
      category: "testando",
      name: "teste usuario 3",
      videos: [
        { id: 19, name: "testar", youtubeUrl: "OBmlCZTF4Xs", playlistId: 15 },
      ],
      userId: 2,
    },
    {
      id: 16,
      category: "testando",
      name: "teste 2 usuario 2",
      videos: [
        {
          id: 20,
          name: "testar novamente",
          youtubeUrl: "7hHZnvjCbVw",
          playlistId: 16,
        },
      ],
      userId: 2,
    },
    {
      id: 17,
      category: "testando",
      name: "nova tarefa usuario 4",
      videos: [
        { id: 21, name: "testar ", youtubeUrl: "m3lF2qEA2cw", playlistId: 17 },
        { id: 22, name: "testar 2", youtubeUrl: "7hHZnvjCbVw", playlistId: 17 },
      ],
      userId: 2,
    },
    {
      id: 15,
      category: "testando",
      name: "teste usuario 3",
      videos: [
        { id: 19, name: "testar", youtubeUrl: "OBmlCZTF4Xs", playlistId: 15 },
      ],
      userId: 2,
    },
    {
      id: 16,
      category: "testando",
      name: "teste 2 usuario 2",
      videos: [
        {
          id: 20,
          name: "testar novamente",
          youtubeUrl: "7hHZnvjCbVw",
          playlistId: 16,
        },
      ],
      userId: 2,
    },
    {
      id: 17,
      category: "testando",
      name: "nova tarefa usuario 4",
      videos: [
        { id: 21, name: "testar ", youtubeUrl: "m3lF2qEA2cw", playlistId: 17 },
        { id: 22, name: "testar 2", youtubeUrl: "7hHZnvjCbVw", playlistId: 17 },
      ],
      userId: 2,
    },],
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
