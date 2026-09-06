import { Module } from '@nestjs/common';
import { DatabaseModule, AuthModule } from 'libs/shared/src';
import { EventModule } from './modules/event/event.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    EventModule,

    RouterModule.register([
      {
        path: "/events",
        module: EventModule
      }
    ])
  ],
})
export class AdministrativeModule {}
