import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateQuestionDto {
  @IsString({message: 'Título Inválido'})
  @Length(0, 255, { message: 'O título deve ter entre 1 e 255 caracteres' })
  title: string;

  @IsString({message: 'Disciplina inválida' })
  @IsNotEmpty({message: 'Disciplina não pode ser vazia'})
  @Length(1, 3, { message: 'A disciplina deve ter entre 1 e 3 caracteres' })
  subjects: string

  @IsString({message: 'Descrição Inválido'})
  @IsNotEmpty({message: 'Descrição não pode ser vazia'})
  @Length(1, 255, { message: 'A descrição deve ter entre 1 e 255 caracteres' })
  description: string;

}