import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsDefined,
  IsStrongPassword,
} from 'class-validator';
export class CreateUserDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsDefined()
  @IsStrongPassword()
  password: string;

  @IsBoolean()
  gender: boolean;
}
