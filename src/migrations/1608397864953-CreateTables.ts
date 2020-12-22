import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1608397864953 implements MigrationInterface {
  name = "CreateTables1608397864953";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "favorite_genre" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "genreId" integer NOT NULL, CONSTRAINT "PK_b8e31618cfc9cc0dba7895964a5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "favorite_movie" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "movieId" integer NOT NULL, "isViewed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_407f83234166eae1334b6f0aa87" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("userId" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying(50) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "favorite_movie"`);
    await queryRunner.query(`DROP TABLE "favorite_genre"`);
  }
}
