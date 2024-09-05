import { Injectable } from '@nestjs/common';
import { Question } from './question/entities/question.entity';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
