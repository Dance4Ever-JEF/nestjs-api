import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt"

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

  public async validate(payload: any) {
    return {
      id: payload.id,
      slug: payload.slug,
      name: payload.name,
      isAdmin: payload.isAdmin,
    } 
  }

}
