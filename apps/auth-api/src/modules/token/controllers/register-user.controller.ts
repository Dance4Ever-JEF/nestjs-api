import { Body, Controller, Post } from "@nestjs/common";
import { RegisterUserService } from "../services";
import { RegisterUserOutputDTO } from "../dto";
import { RegisterUserRequestDTO } from "../dto/request/register-user-request.dto";

@Controller()
export class RegisterUserController{
  constructor(
    private readonly registerUserService: RegisterUserService,
  ){}

  @Post("register")
  public async handle(
    @Body()
    input: RegisterUserRequestDTO
  ): Promise<RegisterUserOutputDTO>{
    return this.registerUserService.execute(
      input
    );
  }
}
