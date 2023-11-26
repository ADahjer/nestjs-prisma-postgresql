import { IsOptional, IsString, Length } from 'class-validator';

export class EditProjectDTO {
  @IsOptional()
  @IsString()
  @Length(4, 20)
  name?: string;
}
