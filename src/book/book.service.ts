import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dtos/create-book.dto';
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
    const book = this.bookRepository.findOne(bookId);
    if (!book) {
      throw new NotFoundException(`Book with ID:${bookId} not found`);
    }
    return book;
  }
}
