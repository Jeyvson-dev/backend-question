import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { AlternativesModule } from 'src/alternatives/alternatives.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    AlternativesModule,
  ],
  providers: [QuestionService],
  controllers: [QuestionController],
})
export class QuestionModule {}
