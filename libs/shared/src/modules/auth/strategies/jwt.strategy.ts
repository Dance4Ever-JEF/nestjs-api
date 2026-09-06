import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { AuthenticatedUser } from "libs/shared/src/interfaces";
import { Strategy, ExtractJwt } from "passport-jwt"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt"){
  constructor(
    configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow("JWT_SECRET"),                                                                                                                                               
    });
  }

  public async validate(payload: AuthenticatedUser) {
    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      isAdmin: payload.isAdmin
    } 
  }
}
