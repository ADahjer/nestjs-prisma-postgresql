import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateProjectDTO {
  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  name: string;
}
