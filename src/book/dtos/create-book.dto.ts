import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;
  @IsString()
  author: string;
  @IsDateString()
  publishedYear: Date;
  @IsString()
  genre: string;
  @IsNumber()
  stock: number;
}
