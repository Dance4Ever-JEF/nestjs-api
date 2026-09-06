import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma";
import { RedisService } from "./redis";

@Module({
  providers: [
    PrismaService,
    RedisService,
  ],
  exports: [
    PrismaService,
    RedisService,
  ]
})
export class DatabaseModule{}
