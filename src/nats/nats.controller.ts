import { Controller, Post, Body } from '@nestjs/common';
import { NatsService } from './nats.service';

@Controller('nats')
export class NatsController {
  constructor(private readonly natsService: NatsService) {}

  @Post('/publish')
  async publishMessage(@Body() data: Record<string, any>): Promise<void> {
    await this.natsService.publish('message', data);
  }
}
