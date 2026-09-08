import { Module } from "@nestjs/common";
import { JwtStrategy } from "./strategies";
import { AdminGuard, JwtAuthGuard } from "./guards";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule,

    PassportModule.register({
      defaultStrategy: 'jwt'
    }),

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: Number(process.env.JWT_EXPIRES_IN)
      }
    })  
  ],
  providers: [
    JwtStrategy,
    AdminGuard,
    JwtAuthGuard
  ],
  exports: [
    AdminGuard,
    JwtAuthGuard,
  ]
})
export class AuthModule{}
