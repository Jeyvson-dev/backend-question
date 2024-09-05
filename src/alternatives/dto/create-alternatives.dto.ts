import { IsString, IsNotEmpty, Length, IsBoolean } from 'class-validator';

export class CreateAlternativesDto {
  @IsString({ message: 'Descrição Inválida' })
  @Length(1, 255, { message: 'O título deve ter entre 1 e 255 caracteres' })
  description: string;

  @IsBoolean({ message: 'IsCorrectAlternative Inválido' })
  @IsNotEmpty({ message: 'IsCorrectAlternative não pode ser vazio' })
  isCorrectAlternative: boolean;
}