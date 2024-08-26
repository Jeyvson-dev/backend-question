import { IsString, IsNotEmpty, ValidateNested, IsObject, IsArray,Length } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAlternativesDto } from 'src/alternatives/dto/create-alternatives.dto';

export class CreateQuestionWithAlternativesDto {
  @IsString({ message: 'Título inválido' })
  @IsNotEmpty({ message: 'Título não pode ser vazio' })
  @Length(0, 255, { message: 'O título deve ter entre 1 e 255 caracteres' })
  title: string;

  @IsString({message: 'Disciplina inválida' })
  @IsNotEmpty({message: 'Disciplina não pode ser vazia'})
  @Length(1, 3, { message: 'A disciplina deve ter entre 1 e 3 caracteres' })
  subjects: string

  @IsString({ message: 'Descrição inválida' })
  @IsNotEmpty({ message: 'Descrição não pode ser vazia' })
  @Length(1, 255, { message: 'A descrição deve ter entre 1 e 255 caracteres' })
  description: string;

  @IsArray({ message: 'Alternativas devem ser um objeto' })
  @ValidateNested({ each: true })
  @Type(() => CreateAlternativesDto)
  alternatives: { [key: string]: CreateAlternativesDto };
}