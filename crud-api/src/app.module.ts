import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user.module';
import { CourseModule } from './modules/course.module';
import { LessonModule } from './modules/lesson.module';
import { AuthModule } from './modules/auth.module';
import { AuthService } from './services/auth.service';
import { UserEntity } from './entities/user.entity';
import { PlaylistEntity } from './entities/course.entity';
import { VideoEntity } from './entities/lesson.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      // host: process.env.DB_HOST,
      // port: Number(process.env.DB_PORT),
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      database: 'db.sqlite',
      dropSchema: true,
      entities: [UserEntity, PlaylistEntity, VideoEntity],
      synchronize: process.env.ENV === 'development',
    }),
    AuthModule,
    UserModule,
    CourseModule,
    LessonModule,
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
