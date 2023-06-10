import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class createDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly topic: string;

  @IsNumber()
  @IsNotEmpty()
  readonly lat: number;

  @IsNumber()
  @IsNotEmpty()
  readonly lon: number;

  @IsString()
  @IsNotEmpty()
  readonly simkarta: string;

  @IsNumber()
  @IsNotEmpty()
  readonly region: number;

  @IsNumber()
  @IsNotEmpty()
  readonly district: number;

  @IsNumber()
  @IsNotEmpty()
  readonly balansOrganization: number;
}
