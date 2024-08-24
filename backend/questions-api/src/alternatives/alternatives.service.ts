import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alternative } from './entities/alternative.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlternativesService {}
