import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Book {
  @ObjectIdColumn()
  @ApiProperty({ type: () => String })
  _id: ObjectID;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  publishedYear: Date;

  @Column()
  genre: string;

  @Column()
  stock: number;
}
