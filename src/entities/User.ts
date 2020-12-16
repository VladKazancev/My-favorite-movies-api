import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ length: 50, nullable: false })
  password: string;
}
