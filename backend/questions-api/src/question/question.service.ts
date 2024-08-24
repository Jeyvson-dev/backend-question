import { Injectable, BadRequestException } from '@nestjs/common';
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
  ) { }

  async findAll(): Promise<Question[]> {
    return this.questionRepository.find();
  }

  async findAllQuestionWithAlternatives(): Promise<any> {
    const questions = await this.questionRepository.find({ 
      relations: ['alternatives'] 
    });

    return questions.map((question) => {
      const alternativesObj = question.alternatives.reduce((acc, alt, index) => {
        acc[`alternative${index + 1}`] = {
          description: alt.description,
          isCorrectAlternative: alt.isCorrectAlternative,
        };
        return acc;
      }, {});

      return {
        id: question.id,
        title: question.title,
        description: question.description,
        alternatives: alternativesObj,
        createdAt: question.createdAt,
        updatedAt: question.updatedAt,
      };
    });
  }

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = this.questionRepository.create(createQuestionDto);
    return this.questionRepository.save(question);
  }

  async createQuestionWithAlternatives(
    title: string,
    description: string,
    alternatives: {
      [key: string]: { description: string; isCorrectAlternative: boolean };
    },
  ): Promise<Question> {

    try {
      const question = this.questionRepository.create({ title, description });
      await this.questionRepository.save(question);
      
      const alternativesEntities = Object.keys(alternatives).map((key) => {
        const alt = alternatives[key];
        const alternative = this.alternativeRepository.create({
          ...alt,
          question,
        });
        return alternative;
      });

      await this.alternativeRepository.save(alternativesEntities);

      question.alternatives = alternativesEntities;

      return question;
    } catch (error) {
      throw new BadRequestException('Erro no servidor, entrar em contato com o suporte');
    }

  }


}
