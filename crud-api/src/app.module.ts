import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./modules/user.module";
import { PlaylistModule } from "./modules/playlist.module";
import { VideoModule } from "./modules/video.module";
import { AuthModule } from "./modules/auth.module";
import { AuthService } from "./services/auth.service";
import { UserEntity } from "./entities/user.entity";
import { PlaylistEntity } from "./entities/playlist.entity";
import { VideoEntity } from "./entities/video.entity";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./guards/auth.guard";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "sqlite",
      // host: process.env.DB_HOST,
      // port: Number(process.env.DB_PORT),
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      database: ":memory:",
      dropSchema: true,
      entities: [UserEntity, PlaylistEntity, VideoEntity],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    VideoModule,
    PlaylistModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
  ],
})
export class AppModule {}
