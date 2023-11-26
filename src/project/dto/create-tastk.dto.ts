import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  name: string;
}
