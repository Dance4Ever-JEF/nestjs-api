import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { DatabaseModule } from "libs/shared/src";
import {
  AuthenticateUserController,
  RegisterUserController,
} from "./controllers";
import {
  AuthenticateUserService,
  RegisterUserService,
} from "./services";

@Module({
  imports: [
    DatabaseModule,

    ConfigModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>("JWT_SECRET"),

        signOptions: {
          expiresIn: Number(
            configService.getOrThrow<string>("JWT_EXPIRES_IN"),
          ),
        },
      }),
    }),
  ],

  controllers: [
    AuthenticateUserController,
    RegisterUserController,
  ],

  providers: [
    AuthenticateUserService,
    RegisterUserService,
  ],

  exports: [
    JwtModule,
  ],
})
export class TokenModule {}
