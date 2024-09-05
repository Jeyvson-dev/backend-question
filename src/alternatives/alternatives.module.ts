import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alternative } from './entities/alternative.entity';
import { AlternativesService } from './alternatives.service';
import { AlternativesController } from './alternatives.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Alternative])],
    providers: [AlternativesService],
    controllers: [AlternativesController],
    exports: [
      TypeOrmModule, 
      AlternativesService
    ]
  })
export class AlternativesModule {}
