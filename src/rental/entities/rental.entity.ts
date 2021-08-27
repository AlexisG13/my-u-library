import { Book } from 'src/book/entities/book.entity';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Rental {
  @ObjectIdColumn()
  _id: ObjectID;
  @Column((type) => Book)
  book: Book;
  @Column()
  rentalDate: Date;
  @Column((type) => ObjectID)
  userId: ObjectID;
  @Column()
  devolutionDate: Date;
  @Column()
  state: string;
}
