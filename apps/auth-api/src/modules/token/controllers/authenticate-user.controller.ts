import { Body, Controller, Post } from "@nestjs/common";
import { AuthenticateUserService } from "../services";
import { AuthenticateUserOutputDTO } from "../dto";
import { AuthenticateUserRequestDTO } from "../dto/request";

@Controller()
export class AuthenticateUserController{
  constructor(
    private readonly authenticateUserService: AuthenticateUserService
  ){}

  @Post("login")
  public async handle(
    @Body()
    input: AuthenticateUserRequestDTO
  ): Promise<AuthenticateUserOutputDTO>{
    return this.authenticateUserService.execute(input);
  }
}
