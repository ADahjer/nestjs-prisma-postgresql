import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class EditUserDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @IsOptional()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password?: string;
}
