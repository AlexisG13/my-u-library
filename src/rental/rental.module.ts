import { Module } from '@nestjs/common';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Rental } from './entities/rental.entity';
import { BookModule } from 'src/book/book.module';
import { Book } from 'src/book/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rental, Book]), AuthModule, BookModule],
  providers: [RentalService],
  controllers: [RentalController],
})
export class RentalModule {}
