import { ApiProperty } from '@nestjs/swagger';
import { Book } from 'src/book/entities/book.entity';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Rental {
  @ObjectIdColumn()
  @ApiProperty({ type: () => String })
  _id: ObjectID;
  @Column((type) => Book)
  @ApiProperty({ type: () => Book })
  book: Book;
  @Column()
  rentalDate: Date;
  @Column()
  userId: string;
  @Column()
  devolutionDate: Date;
  @Column()
  state: string;
}
