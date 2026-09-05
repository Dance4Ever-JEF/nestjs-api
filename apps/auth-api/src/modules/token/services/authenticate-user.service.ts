import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthenticatedUser, PrismaService } from "libs/shared/src";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { AuthenticateUserInputDTO, AuthenticateUserOutputDTO } from "../dto";

@Injectable()
export class AuthenticateUserService{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ){}

  public async execute(
    { email, password }: AuthenticateUserInputDTO
  ): Promise<AuthenticateUserOutputDTO>{
    const user = await this.prismaService.user.findFirst({
      where: {
        email
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true
      }
    });

    if (!user) throw new UnauthorizedException("E-mail e/ou senha inválidos.");
  
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new UnauthorizedException("E-mail e/ou senha inválidos.");

    const payload: AuthenticatedUser = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}
