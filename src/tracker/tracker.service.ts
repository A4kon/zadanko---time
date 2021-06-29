import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { Tracker } from '../utils/entity/tracker.entity';
import { TimeHelper } from '../utils/helpers/time.helper';
import { StartTrackingTaskDto, UpdateTaskDto } from './tracker.dto';
/*
// TODO:
Add interfaces for promise reponses
Add business error handling
*/
@Injectable()
export class TrackerService {
  constructor(
    @InjectRepository(Tracker)
    private readonly tracker: Repository<Tracker>,
    private readonly helper: TimeHelper,
  ) {}
  async getTaskById(id: number) {
    const entityManager = getManager();
    return await entityManager.query(
      `SELECT T2.id, T2.taskName,T2.parentId as referenceId, T2.startDate, T2.endDate
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
  async getCurrentTask(id: number) {
    return await this.tracker.findOne({
      ownerId: id,
      isActive: true,
    });
  }
  async getAllTasks(id: number) {
    return await this.tracker.find({
      ownerId: id,
    });
  }
  async createTask(data: StartTrackingTaskDto) {
    const activeTask = await this.getCurrentTask(data.ownerId);
    if (activeTask) {
      await this.pauseTask(activeTask.id);
    }
    data.startDate = await this.helper.getCurrentDateTime();
    const { id } = await this.tracker.save(data);
    return await this.getTaskById(id);
  }
  async updateTask(id, data: UpdateTaskDto) {
    await this.tracker.update({ id }, data);
    return await this.tracker.findOne({ id });
  }
  async endTask(id: number) {
    const oldRow = await this.tracker.findOne({ where: { id } });
    if (!oldRow.isActive) {
      throw new Error('Unable to end unactive task');
    }
    return await this.tracker.update(
      { id },
      {
        isEnded: true,
        isActive: false,
        endDate: await this.helper.getCurrentDateTime(),
        isReasumeAble: false,
      },
    );
  }
  async pauseTask(id: number) {
    const oldRow = await this.tracker.findOne({ where: { id } });
    if (!oldRow.isActive) {
      throw new Error('Unable to pause unactive task');
    }
    return await this.tracker.update(
      { id },
      {
        isActive: false,
        endDate: await this.helper.getCurrentDateTime(),
        isReasumeAble: true,
      },
    );
  }
  async reasumeTask(id: number) {
    const oldRow = await this.tracker.findOne({ where: { id } });
    const activeTask = await this.getCurrentTask(oldRow.ownerId);
    if (activeTask) {
      await this.pauseTask(activeTask.id);
    }
    if (!oldRow.isReasumeAble) {
      throw new Error('Unable to reasume task');
    }
    if (oldRow.isEnded) {
      throw new Error('Unable to reasume finished task');
    }
    const obj = {
      startDate: await this.helper.getCurrentDateTime(),
      taskName: oldRow.taskName,
      parentId: id,
      ownerId: oldRow.ownerId,
    } as StartTrackingTaskDto;
    const result = await this.tracker.save(obj);
    await this.tracker.update({ id }, { isReasumeAble: false });
    return await this.getTaskById(result.id);
  }
}
