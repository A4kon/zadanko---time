import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tracker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  parentId: number;

  @Column()
  ownerId: number;

  @Column()
  taskName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isEnded: boolean;

  @Column({ default: false })
  isReasumeAble: boolean;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;
}
