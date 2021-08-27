import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dtos/create-book.dto';
import { ObjectID } from 'mongodb';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  async addBook(createBookDto: CreateBookDto): Promise<Book> {
    return this.bookRepository.save(createBookDto);
  }

  async getBook(bookId: string): Promise<Book> {
    if (!ObjectID.isValid(bookId)) {
      throw new NotFoundException(`Book with ID:${bookId} not found`);
    }
    const book = await this.bookRepository.findOne(bookId);
    console.log(book);
    if (!book) {
      throw new NotFoundException(`Book with ID:${bookId} not found`);
    }
    return book;
  }
}
