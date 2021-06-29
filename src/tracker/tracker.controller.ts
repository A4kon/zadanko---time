import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StartTrackingTaskDto, UpdateTaskDto } from './tracker.dto';
import { TrackerService } from './tracker.service';
/*
// TODO:
Add interfaces for promise reponses
Add more precise description for API
*/
@ApiTags('tracker')
@Controller('tracker')
export class TrackerController {
  constructor(private readonly service: TrackerService) {}
  @ApiOperation({
    summary: 'Returns current task for given user',
  })
  @Get('/task-current-task/:ownerid')
  async getCurrentTask(@Param('ownerid') id: number): Promise<any> {
    return await this.service.getCurrentTask(id);
  }
  @ApiOperation({
    summary: 'Returns array of tracked tasks associated with given id',
  })
  @Get('/task-by-id/:id')
  async getTaskById(@Param('id') id: number): Promise<any> {
    return await this.service.getTaskById(id);
  }
  @ApiOperation({
    summary: 'Returns all tasks for given user',
  })
  @Get('/all-tasks/:ownerid')
  async getAllTasks(@Param('ownerid') id: number): Promise<any> {
    return await this.service.getAllTasks(id);
  }
  @ApiOperation({
    summary: 'Create a task, also pausing current active task for user',
  })
  @ApiResponse({ status: 200, description: 'Record created.' })
  @ApiResponse({ status: 500, description: 'Error occured.' })
  @Post()
  async createUsers(@Body() data: StartTrackingTaskDto) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Track added successfully',
      data: await this.service.createTask(data),
    };
  }
  @ApiOperation({
    summary: 'Update a task',
  })
  @ApiResponse({ status: 200, description: 'Record patched.' })
  @ApiResponse({ status: 500, description: 'Error occured.' })
  @Patch('update-task/:id')
  async updateTask(
    @Param('id') id: number,
    @Body() data: UpdateTaskDto,
  ): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      message: 'Task updated successfully',
      data: await this.service.updateTask(id, data),
    };
  }
  @ApiOperation({
    summary:
      'Reasume paused tasks by creating new instance of it and pausing current active task',
  })
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Record patched.' })
  @ApiResponse({ status: 500, description: 'Error occured.' })
  @Patch('reasume-task/:id')
  async reasumeTask(@Param('id') id: number): Promise<void> {
    await this.service.reasumeTask(id);
  }
  @ApiOperation({
    summary: 'Pause active task',
  })
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Record patched.' })
  @ApiResponse({ status: 500, description: 'Error occured.' })
  @Patch('pause-task/:id')
  async pauseTask(@Param('id') id: number): Promise<void> {
    await this.service.pauseTask(id);
  }
  @ApiOperation({
    summary: 'End active task',
  })
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Record patched.' })
  @ApiResponse({ status: 500, description: 'Error occured.' })
  @Patch('end-task/:id')
  async endTask(@Param('id') id: number): Promise<void> {
    await this.service.endTask(id);
  }
}
