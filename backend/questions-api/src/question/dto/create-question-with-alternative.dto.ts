import { IsString, IsNotEmpty, ValidateNested, IsObject, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAlternativesDto } from 'src/alternatives/dto/create-alternatives.dto';

export class CreateQuestionWithAlternativesDto {
  @IsString({ message: 'Título inválido' })
  @IsNotEmpty({ message: 'Título não pode ser vazio' })
  title: string;

  @IsString({ message: 'Descrição inválida' })
  @IsNotEmpty({ message: 'Descrição não pode ser vazia' })
  description: string;

  @IsArray({ message: 'Alternativas devem ser um objeto' })
  @ValidateNested({ each: true })
  @Type(() => CreateAlternativesDto)
  alternatives: { [key: string]: CreateAlternativesDto };
}