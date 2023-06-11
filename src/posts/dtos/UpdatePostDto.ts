import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdatePostDto {
  title?: string;

  @IsNotEmpty()
  @MinLength(10)
  description: string;
}
