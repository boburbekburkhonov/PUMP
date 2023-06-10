import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class createDto {
  @IsNumber()
  @IsNotEmpty()
  readonly idNumber: number;

  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
