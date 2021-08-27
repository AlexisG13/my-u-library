import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { User } from 'src/auth/entities/user.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AddRentalDto } from './dtos/add-rental.dto';
import { Rental } from './entities/rental.entity';
import { RentalService } from './rental.service';

@Controller('rental')
@UseGuards(AuthGuard(), RolesGuard)
export class RentalController {
  constructor(private rentalService: RentalService) {}

  @ApiBearerAuth()
  @Get()
  @Roles(['student'])
  getRentals(@GetUser() user: User) {
    return this.rentalService.getUserRentals(user);
  }

  @ApiBearerAuth()
  @Post()
  @Roles(['student'])
  addRental(@GetUser() user: User, @Body() addRentalDto: AddRentalDto) {
    return this.rentalService.addRental(addRentalDto, user);
  }

  @ApiBearerAuth()
  @Post(':rentalId/return')
  @Roles(['librarian'])
  returnBook(@Param('rentalId') rentalId: string): Promise<Rental> {
    return this.rentalService.returnBook(rentalId);
  }
}
