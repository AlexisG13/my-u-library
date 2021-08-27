import { IsString } from 'class-validator';

export class AddRentalDto {
  @IsString()
  bookId: string;
}
