import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class FavorieGenre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: false })
  genre_id: number;
}
