import { IsNotEmpty, IsString} from "class-validator";

export class roleDto {

  @IsString()
  @IsNotEmpty()
  readonly name: string;

}