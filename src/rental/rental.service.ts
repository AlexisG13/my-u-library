import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { BookService } from 'src/book/book.service';
import { Repository } from 'typeorm';
import { AddRentalDto } from './dtos/add-rental.dto';
import { Rental } from './entities/rental.entity';
import { ObjectID } from 'mongodb';
import { getManager } from 'typeorm';

@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental) private rentalRepository: Repository<Rental>,
    private bookService: BookService,
  ) {}

  async addRental({ bookId }: AddRentalDto, user: User): Promise<Rental> {
    const book = await this.bookService.getBook(bookId);
    book.stock -= 1;
    const devolutionDate = new Date();
    //Devolution date is set 3 weeks after rental date
    devolutionDate.setDate(devolutionDate.getDate() + 21);
    const newRental = {
      book,
      devolutionDate,
      rentalDate: new Date(),
      state: 'OPEN',
      userId: user._id,
    };
    await getManager().transaction(async (transactionalEntityManager) => {
      transactionalEntityManager.save(book);
      transactionalEntityManager.save(Rental, newRental);
    });
    return this.rentalRepository.findOne({ where: newRental });
  }

  async getUserRentals(user: User): Promise<Rental[]> {
    return this.rentalRepository.find({ where: { userId: user._id } });
  }

  async returnBook(rentalId: string): Promise<Rental> {
    if (!ObjectID.isValid(rentalId)) {
      throw new NotFoundException(`A rental with ID:${rentalId} not found`);
    }
    const rental = await this.rentalRepository.findOne(rentalId);
    if (!rental) {
      throw new NotFoundException(`A rental with ID:${rentalId} not found`);
    }
    rental.state = 'CLOSED';
    rental.book.stock -= 1;
    await getManager().transaction(async (transactionalEntityManager) => {
      transactionalEntityManager.save(rental.book);
      transactionalEntityManager.save(rental);
    });
    return rental;
  }
}
