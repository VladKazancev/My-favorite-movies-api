import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class FavoriteMovie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  movieId: number;

  @Column({ nullable: false, default: false })
  isViewed: boolean;
}
