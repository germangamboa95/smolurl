import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1610261672314 implements MigrationInterface {
    name = 'initial1610261672314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "link" ("id" varchar PRIMARY KEY NOT NULL, "original_url" varchar NOT NULL, "hash" varchar NOT NULL, "webhook" varchar, "webhook_meta" text, "deleted_at" datetime, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_7ec9ae0a307e7bcb62c85e752d" ON "link" ("hash") `);
        await queryRunner.query(`CREATE TABLE "hit" ("id" varchar PRIMARY KEY NOT NULL, "link_id" varchar NOT NULL, "meta" text NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE INDEX "IDX_b1e44ee5504e73df4bf7679847" ON "hit" ("link_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_b1e44ee5504e73df4bf7679847"`);
        await queryRunner.query(`DROP TABLE "hit"`);
        await queryRunner.query(`DROP INDEX "IDX_7ec9ae0a307e7bcb62c85e752d"`);
        await queryRunner.query(`DROP TABLE "link"`);
    }

}
