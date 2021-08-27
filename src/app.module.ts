import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { RentalModule } from './rental/rental.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      autoLoadEntities: true,
      synchronize: true,
      url: process.env.DB_URL,
      useUnifiedTopology: true,
    }),
    BookModule,
    AuthModule,
    RentalModule,
  ],
})
export class AppModule {}
