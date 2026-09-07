import { Module } from '@nestjs/common';
import { DatabaseModule, AuthModule } from 'libs/shared/src';
import { EventModule } from './modules/event/event.module';
import { RouterModule } from '@nestjs/core';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QueueModule } from 'apps/event-api/src/modules/queue/queue.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    EventModule,
    QueueModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    BullModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        connection: {
          url: configService.get<string>("REDIS_URL")
        }
      }),
    }),

    RouterModule.register([
      {
        path: "/events",
        module: EventModule
      }
    ])
  ],
})
export class AdministrativeModule {}
