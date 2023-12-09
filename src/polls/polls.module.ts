import { Module } from '@nestjs/common';
import { PollsService } from './polls.service';
import { PollsController } from './polls.controller';
import { redisModule } from '../modules.config';


@Module({
  imports: [redisModule],
  controllers: [PollsController],
  providers: [PollsService]
})
export class PollsModule {}
