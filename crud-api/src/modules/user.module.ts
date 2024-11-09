import { Module } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UserController } from "src/controllers/user.controller";
import { UserEntity } from "src/entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "src/repositories/user.repository";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
