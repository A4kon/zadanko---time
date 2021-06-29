import { MigrationInterface, QueryRunner } from 'typeorm';

export class new1624959996637 implements MigrationInterface {
  name = 'new1624959996637';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `tracker` CHANGE `parentId` `parentId` int NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `tracker` CHANGE `startDate` `startDate` datetime NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `tracker` CHANGE `startDate` `startDate` datetime NOT NULL DEFAULT ''2021-06-29 09:29:36''",
    );
    await queryRunner.query(
      "ALTER TABLE `tracker` CHANGE `parentId` `parentId` int NULL DEFAULT 'NULL'",
    );
  }
}
