import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeHelper } from '../utils/helpers/time.helper';
import { Tracker } from '../utils/entity/tracker.entity';
import { TrackerController } from './tracker.controller';
import { TrackerService } from './tracker.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tracker]), TimeHelper],
  controllers: [TrackerController],
  providers: [TrackerService, TimeHelper],
})
export class TrackerModule {}
