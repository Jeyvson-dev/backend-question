import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionService {

    constructor(
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
    ) {}

    async findAll(): Promise<Question[]> {
        return this.questionRepository.find();
    }

    async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
        const question = this.questionRepository.create(createQuestionDto);
        return this.questionRepository.save(question);
    }

}
