import { Module } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { UserEntity } from "../entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "../repositories/user.repository";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
