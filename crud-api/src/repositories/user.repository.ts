import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { LoginDto } from "../dtos/auth/login/login.dto";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  public async create(user: UserEntity): Promise<UserEntity> {
    const newUser = await this.findByEmail(user.email);

    if (newUser != null) {
      throw new BadRequestException("Email ja cadastrado.");
    } else if (newUser == null) {
      return await this.userRepository.save(user);
    } else {
      throw new BadRequestException("Email invalido.");
    }
  }

  public findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  public async login({ email, password }: LoginDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (user != null && (await bcrypt.compare(password, user.password))) {
      return user;
    } else {
      throw new UnauthorizedException("Email e/ou senha incorretos.");
    }
  }

  public async findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async delete(id: number): Promise<void> {
    const user = await this.findById(id);
    user.active = false;
    this.userRepository.save(user);
  }

  public async findAll() {
    const users: UserEntity[] = await this.userRepository.find();

    return users;
  }
}
