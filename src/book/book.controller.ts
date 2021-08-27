import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { Book } from './entities/book.entity';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  addBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.bookService.addBook(createBookDto);
  }

  @Get('/:bookId')
  getBook(@Param('bookId') bookId: string): Promise<Book> {
    return this.bookService.getBook(bookId);
  }
}
