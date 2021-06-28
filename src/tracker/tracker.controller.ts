import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentTaskDto, StartTrackingTaskDto } from './tracker.dto';
import { TrackerService } from './tracker.service';

@ApiTags('tracker')
@Controller('tracker')
export class TrackerController {
  constructor(private readonly service: TrackerService) {}
  @Get('/task-by-id/:id')
  async getTaskById(@Param('id') id: number): Promise<any> {
    return await this.service.getTaskById(id);
  }
  @Get('/task-all-tasks/:ownerid')
  async getAllTasks(@Param('ownerid') id: number): Promise<any> {
    return await this.service.getAllTasks(id);
  }
  @Post()
  async createUsers(@Body() data: StartTrackingTaskDto) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Track added successfully',
      data: await this.service.createTask(data),
    };
  }
}
