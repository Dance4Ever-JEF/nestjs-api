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
    AuthModule,

    TokenModule,
  ],
  controllers: [],
  providers: [

  ]
})
export class AuthModule {}
