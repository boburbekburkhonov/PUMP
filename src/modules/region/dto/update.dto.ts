import { IsString, IsOptional, IsNumber } from 'class-validator';

export class updateDto {
  @IsNumber()
  @IsOptional()
  readonly idNumber: number;

  @IsString()
  @IsOptional()
  readonly name: string;
}
