import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AlternativesService } from './alternatives/alternatives.service';
import { AlternativesController } from './alternatives/alternatives.controller';
import { AlternativesModule } from './alternatives/alternatives.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    QuestionModule,
    UsersModule,
    AuthModule,
    AlternativesModule,
  ],
  controllers: [AppController, AlternativesController],
  providers: [AppService, AlternativesService],
})
export class AppModule {}
