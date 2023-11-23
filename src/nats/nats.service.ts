import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class NatsService {
  private readonly client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.NATS,
      options: {
        url: process.env.NATS_SERVER_URL || 'nats://localhost:4222',
      },
    });
  }

  async publish(pattern: string, data: Record<string, any>): Promise<void> {
    await this.client.emit(pattern, data).toPromise();
  }

  async subscribe(pattern: string, callback: (data: any) => void): Promise<void> {
    await this.client.connect();
    await this.client
      .send(pattern, {}) // Use the `send` method for subscription
      .subscribe((data) => callback(data));
  }
}
