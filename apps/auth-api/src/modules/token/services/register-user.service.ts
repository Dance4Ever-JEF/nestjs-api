import { PrismaService } from "libs/shared/src";
import { RegisterUserInputDTO, RegisterUserOutputDTO } from "../dto";
import { ConflictException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class RegisterUserService{
  constructor(
    private readonly prismaService: PrismaService
  ){}

  public async execute(
    { name, email, password }: RegisterUserInputDTO
  ): Promise<RegisterUserOutputDTO>{
    const user = await this.prismaService.user.findFirst({
        where: { email }  
    });

    if (user != null) throw new ConflictException("O e-mail informado já está cadastrado");
        
    const passwordHash: string = await bcrypt.hash(password, Number(process.env.HASH_SALT));
    
    return await this.prismaService.user.create({
      data: {
        name,
        email,
        password: passwordHash
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }
}
