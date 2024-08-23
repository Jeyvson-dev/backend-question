import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { Alternative } from 'src/alternatives/entities/alternative.entity';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionService {

    constructor(
        @InjectRepository(Question) private questionRepository: Repository<Question>,
        @InjectRepository(Alternative) private alternativeRepository: Repository<Alternative>,
    ) {}

    async findAll(): Promise<Question[]> {
        return this.questionRepository.find();
    }

    async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
        const question = this.questionRepository.create(createQuestionDto);
        return this.questionRepository.save(question);
    }

    async createQuestionWithAlternatives(
        title: string,
        description: string,
        alternatives: { description: string; isCorrectAlternative: boolean }[],
      ): Promise<Question> {
        const question = this.questionRepository.create({ title, description });
        await this.questionRepository.save(question);
    
        const alternativesEntities = alternatives.map((alt) => {
          const alternative = this.alternativeRepository.create({
            ...alt,
            question,
          });
          return alternative;
        });
    
        await this.alternativeRepository.save(alternativesEntities);
    
        question.alternatives = alternativesEntities;
    
        return question;
      }

}
