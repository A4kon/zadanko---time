import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tracker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  parentId: number;

  @Column()
  ownerId: number;

  @Column()
  taskName: string;

  @Column()
  isEnded: boolean;

  @Column()
  isReasumeAble: boolean;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;
}
