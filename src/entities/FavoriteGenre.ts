import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class FavoriteGenre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  genreId: number;
}
