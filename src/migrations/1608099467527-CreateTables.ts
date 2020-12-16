import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTables1608099467527 implements MigrationInterface {
    name = 'CreateTables1608099467527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorie_genre" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "genre_id" integer NOT NULL, CONSTRAINT "PK_e7229bfb63e7eea0a97348afec3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorie_movie" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "movie_id" integer NOT NULL, "isViewed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_59d8d6733ed81c89564b6d8c6d4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("user_id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying(50) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "favorie_movie"`);
        await queryRunner.query(`DROP TABLE "favorie_genre"`);
    }

}
