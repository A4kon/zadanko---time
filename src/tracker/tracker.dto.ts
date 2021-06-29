import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class StartTrackingTaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  taskName: string;
  @ApiProperty({
    default: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  ownerId: number;
  @ApiProperty({
    default: null,
  })
  @IsOptional()
  parentId: number;
  @IsOptional()
  startDate: string;
}
export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  taskName: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    default: 1,
  })
  ownerId: number;
}
