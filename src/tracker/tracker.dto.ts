import { ApiProperty } from '@nestjs/swagger';

export class StartTrackingTaskDto {
  @ApiProperty()
  taskName: string;
  @ApiProperty({
    default: 1,
  })
  ownerId: number;
}

export class EndTrackingTaskDto {
  @ApiProperty()
  taskId: number;
}

export class PauseTrackingTaskDto {
  @ApiProperty()
  taskId: number;
}

export class ReasumeTrackingTaskDto {
  @ApiProperty()
  taskId: number;
}
