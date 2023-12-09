import { Body, Controller, Post } from '@nestjs/common';
import { PollsService } from './polls.service';
import { CreatePollDto, JoinPollDto } from './dtos';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post('/create')
  async create(@Body() createPollDto: CreatePollDto) {
    const result = await this.pollsService.createPoll(createPollDto);
    return result
  }

  @Post('/join')
  async join(@Body() joinPollDto: JoinPollDto) {
    const result = await this.pollsService.joinPoll(joinPollDto);
    return result;
  }
  
  @Post('/rejoin')
  async rejoin() {
    const result = await this.pollsService.rejoinPoll({
      pollID: 'placeholder',
      userID: 'placeholder',
      name: 'placeholder'
    });
    return result;
  }
}