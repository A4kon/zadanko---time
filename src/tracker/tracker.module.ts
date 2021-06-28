import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tracker } from '../utils/entity/tracker.entity';
import { TrackerController } from './tracker.controller';
import { TrackerService } from './tracker.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tracker])],
  controllers: [TrackerController],
  providers: [TrackerService],
})
export class TrackerModule {}
