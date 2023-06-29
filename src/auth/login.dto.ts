import { IsDefined } from 'class-validator';
export class LoginDto {
  @IsDefined()
  password: string;

  @IsDefined()
  username: string;
}
