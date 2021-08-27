import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Rental } from 'src/rental/entities/rental.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Rental]), AuthModule],
  providers: [BookService],
  controllers: [BookController],
  exports: [BookService],
})
export class BookModule {}
