import { Module } from '@nestjs/common';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Rental } from './entities/rental.entity';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rental]), AuthModule, BookModule],
  providers: [RentalService],
  controllers: [RentalController],
})
export class RentalModule {}
