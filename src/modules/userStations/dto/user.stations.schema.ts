import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class createDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsOptional()
  readonly stationId?: any;
}
