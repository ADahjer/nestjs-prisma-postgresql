import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class EditTaskDTO {
  @IsString()
  @IsOptional()
  @Length(3, 30)
  name?: string;

  @IsBoolean()
  @IsOptional()
  done?: boolean;
}
