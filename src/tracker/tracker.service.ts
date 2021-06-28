import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { Tracker } from '../utils/entity/tracker.entity';
import { PauseTrackingTaskDto, StartTrackingTaskDto } from './tracker.dto';

@Injectable()
export class TrackerService {
  constructor(
    @InjectRepository(Tracker)
    private readonly tracker: Repository<Tracker>,
  ) {}
  async getTaskById(id: number) {
    const entityManager = getManager();
    return await entityManager.query(
      `SELECT T2.id, T2.taskName,T2.parentId as referenceId
        FROM (
            SELECT
                @r AS _id,
                (SELECT @r := parentId FROM tracker WHERE id = _id) AS parent,
                @l := @l + 1 AS lvl
            FROM
                (SELECT @r := ${id}, @l := 0) vars,
                tracker h
            WHERE @r <> 0) T1
        JOIN tracker T2
        ON T1._id = T2.id
        ORDER BY T1.lvl DESC`,
    );
  }
  async getAllTasks(id: number) {
    return await this.tracker.find({
      ownerId: id,
    });
  }
  async createTask(data: StartTrackingTaskDto) {
    const { id } = await this.tracker.save(data);
    return await this.getTaskById(id);
  }
  async endTask(data: EndTrackingTaskDto) {}
  async pauseTracking(data: PauseTrackingTaskDto) {}
  async reasumeTracking(data: ReasumeTrackingTaskDto) {}
}
