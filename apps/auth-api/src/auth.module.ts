import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/shared/src';
import { TokenModule } from './modules/token/token.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    TokenModule
  ],
  controllers: [],
  providers: [

  ]
})
export class AuthModule {}
