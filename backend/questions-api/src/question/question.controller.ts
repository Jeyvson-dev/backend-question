import { Controller, Get, Param, Post, Body, UsePipes, ValidationPipe, BadRequestException, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './entities/question.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('question')
export class QuestionController {

    constructor(private readonly questionService: QuestionService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<Question[]> {
        return this.questionService.findAll();
    }

    @UseGuards(JwtAuthGuard)
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
            throw new BadRequestException('Erro no servidor, entrar em contato com o suporte');
        }
    
    }
    
    @UseGuards(JwtAuthGuard)
    @Post('create-question-with-alternative')
    createQuestionWithAlternatives(@Body() createQuestionDto: any){

        const { title, description, alternatives } = createQuestionDto;
        console.log(alternatives);
        return 'teste'
    }


}
