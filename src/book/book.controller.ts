import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Rental } from 'src/rental/entities/rental.entity';
import { BookService } from './book.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { Book } from './entities/book.entity';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(['librarian'])
  addBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.bookService.addBook(createBookDto);
  }

  @Get('/:bookId')
  getBook(@Param('bookId') bookId: string): Promise<Book> {
    return this.bookService.getBook(bookId);
  }

  @Get()
  getBooks(): Promise<Book[]> {
    return this.bookService.getBooks();
  }

  @Get(':bookId/rental')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(['librarian'])
  getBookRentals(@Param('bookId') bookId: string): Promise<Rental[]> {
    return this.bookService.getBookRentals(bookId);
  }
}
