import { Controller, Get, Param, Post, Body, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './entities/question.entity';

@Controller('question')
export class QuestionController {

    constructor(private readonly questionService: QuestionService) { }

    @Get()
    async findAll(): Promise<Question[]> {
        return this.questionService.findAll();
    }
    @Post()
    @UsePipes(new ValidationPipe({
        exceptionFactory: (errors) => {
            return new BadRequestException({
                statusCode: 400,
                message: 'Dados incorretos',
                errors: errors.map(error => ({
                    field: error.property,
                    message: Object.values(error.constraints)[0]
                }))
            });
        }
    }))
    async create(@Body() createQuestionDto: CreateQuestionDto): Promise<Question> {

        try {
            const questionSaved = this.questionService.create(createQuestionDto);

            return questionSaved;

        } catch (error) {
            throw new BadRequestException('Houve um erro no servidor, por favor entrar em contato com o suporte');
        }
    
    }

}
