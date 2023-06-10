import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class updateDto {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly topic: string;

  @IsNumber()
  @IsOptional()
  readonly lat: number;

  @IsNumber()
  @IsOptional()
  readonly lon: number;

  @IsString()
  @IsOptional()
  readonly simkarta: string;

  @IsNumber()
  @IsOptional()
  readonly region: number;

  @IsNumber()
  @IsOptional()
  readonly district: number;

  @IsNumber()
  @IsOptional()
  readonly balansOrganization: number;
}
