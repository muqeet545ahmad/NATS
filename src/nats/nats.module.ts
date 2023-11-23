import { Module } from '@nestjs/common';
import { NatsController } from './nats.controller';
import { NatsService } from './nats.service';

@Module({
  controllers: [NatsController],
  providers: [NatsService],
  exports: [NatsService], // Make NatsService available for injection in other modules
})
export class NatsModule {}
