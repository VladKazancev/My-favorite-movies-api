import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class FavorieMovie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: false })
  movie_id: number;

  @Column({ nullable: false, default: false })
  isViewed: boolean;
}
