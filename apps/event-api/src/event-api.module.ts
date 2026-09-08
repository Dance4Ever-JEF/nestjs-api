import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { AuthModule, DatabaseModule } from 'libs/shared/src';
import { QueueModule } from './modules/queue/queue.module';
import { TicketsModule } from './modules/tickets/tickets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    BullModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        connection: {
          url: configService.get<string>("REDIS_URL")
        }
      }),
    }),

    QueueModule,
    TicketsModule,

    RouterModule.register([
      {
        path: "/queues",
        module: QueueModule
      },
      {
        path: "/tickets",
        module: TicketsModule
      }
    ])
  ],
})
export class EventApiModule {}
