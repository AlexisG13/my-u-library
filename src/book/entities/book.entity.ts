import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Book {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  publishedYear: Date;

  @Column()
  genre: string;
}
