import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { Alternative } from 'src/alternatives/entities/alternative.entity';
import { AlternativesService } from 'src/alternatives/alternatives.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { CreateQuestionWithAlternativesDto } from './dto/create-question-with-alternative.dto';

@Injectable()
export class QuestionService {

  constructor(
    @InjectRepository(Question) private questionRepository: Repository<Question>,
    @InjectRepository(Alternative) private alternativeRepository: Repository<Alternative>,
    private readonly alternativesService: AlternativesService
  ) { }

  async findAll(): Promise<Question[]> {
    return this.questionRepository.find();
  }

  async findAllQuestionWithAlternatives(): Promise<any> {
    const questions = await this.questionRepository.find({
      relations: ['alternatives'],
    });

    return questions.map((question) => {
      const alternativesArray = question.alternatives.map((alt) => ({
        description: alt.description,
        isCorrectAlternative: alt.isCorrectAlternative,
      }));

      return {
        id: question.id,
        title: question.title,
        description: question.description,
        alternatives: alternativesArray,
        createdAt: question.createdAt,
        updatedAt: question.updatedAt,
      };
    });
  }

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = this.questionRepository.create(createQuestionDto);
    return this.questionRepository.save(question);
  }

  async createQuestionWithAlternatives(questionWithAlternativeDto: CreateQuestionWithAlternativesDto): Promise<Question> {

    try {

      await this.alternativesService.validateAlternatives(questionWithAlternativeDto);

      const question = this.questionRepository.create({
        title: questionWithAlternativeDto.title,
        description: questionWithAlternativeDto.description
      });
      await this.questionRepository.save(question);

      const alternativesEntities = await this.alternativesService.create(questionWithAlternativeDto, question);

      question.alternatives = alternativesEntities;

      return question;

    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Erro no servidor, entrar em contato com o suporte');
    }
  }


}
