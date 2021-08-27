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
import { Rental } from 'src/rental/entities/rental.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @InjectRepository(Rental) private rentalRepository: Repository<Rental>,
  ) {}

  async addBook(createBookDto: CreateBookDto): Promise<Book> {
    return this.bookRepository.save(createBookDto);
  }

  async getBook(bookId: string): Promise<Book> {
    if (!ObjectID.isValid(bookId)) {
      throw new NotFoundException(`Book with ID:${bookId} not found`);
    }
    const book = await this.bookRepository.findOne(bookId);
    if (!book) {
      throw new NotFoundException(`Book with ID:${bookId} not found`);
    }
    return book;
  }

  getBooks(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  removeStock(book: Book): Promise<Book> {
    if (book.stock < 1) {
      throw new BadRequestException('No book stock available');
    }
    book.stock -= 1;
    return this.bookRepository.save(book);
  }

  addStock(book: Book): Promise<Book> {
    book.stock += 1;
    return this.bookRepository.save(book);
  }

  async getBookRentals(bookId: string): Promise<Rental[]> {
    const book = await this.getBook(bookId);
    return this.rentalRepository.find({ where: { book } });
  }
}
