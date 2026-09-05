import { Module } from "@nestjs/common";
import { DatabaseModule } from "libs/shared/src";
import { AuthenticateUserController, RegisterUserController } from "./controllers";
import { AuthenticateUserService, RegisterUserService } from "./services";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    PassportModule,

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
      }),
    }),
  ],
  controllers: [
    AuthenticateUserController,
    RegisterUserController
  ],
  providers: [
    AuthenticateUserService,
    RegisterUserService
  ]
})
export class TokenModule{}
