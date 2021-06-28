import { MigrationInterface, QueryRunner } from 'typeorm';

export class test1624906241242 implements MigrationInterface {
  name = 'test1624906241242';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `tracker` (`id` int NOT NULL AUTO_INCREMENT, `parentId` int NOT NULL, `ownerId` int NOT NULL, `taskName` varchar(255) NOT NULL, `isEnded` tinyint NOT NULL, `isReasumeAble` tinyint NOT NULL, `startDate` datetime NOT NULL, `endDate` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `tracker`');
  }
}
