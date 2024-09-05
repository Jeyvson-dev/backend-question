import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alternative } from './entities/alternative.entity';
import { Repository } from 'typeorm';
import { CreateAlternativesDto } from './dto/create-alternatives.dto';
import { CreateQuestionWithAlternativesDto } from 'src/question/dto/create-question-with-alternative.dto';
import { Question } from 'src/question/entities/question.entity';

@Injectable()
export class AlternativesService {
    constructor(
        @InjectRepository(Alternative) private alternativeRepository: Repository<Alternative>
    ) {}

    async create(
        questionWithAlternativeDto: CreateQuestionWithAlternativesDto,
        question: Question
    ): Promise<Alternative[]> {

        try {
            const alternatives = questionWithAlternativeDto.alternatives;

            const alternativesEntities = Object.keys(alternatives).map((key) => {
                const alt = alternatives[key];
                const alternative = this.alternativeRepository.create({
                    ...alt,
                    question,
                });
                return alternative;
            });

            await this.alternativeRepository.save(alternativesEntities);

            return alternativesEntities;

        } catch (error) {
            throw new BadRequestException('Erro no servidor, entrar em contato com o suporte');
        }


    }

    async validateAlternatives(questionWithAlternativeDto: CreateQuestionWithAlternativesDto): Promise<boolean> {

        const correctAlternativesCount = Object.values(questionWithAlternativeDto.alternatives).filter(alt => alt.isCorrectAlternative).length;

        if (correctAlternativesCount > 1) throw new BadRequestException('Apenas uma alternativa pode ser marcada como correta.');

        return true;
    }
}
