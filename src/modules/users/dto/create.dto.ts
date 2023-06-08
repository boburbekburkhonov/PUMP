import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class createDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly telephone: string;

  @IsString()
  @IsNotEmpty()
  readonly role: string;
}
