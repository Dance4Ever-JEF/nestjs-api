import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  Matches,
} from "class-validator";
import { Type } from "class-transformer";

export class TicketRequestDTO {
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{11}$/, { message: "CPF deve conter 11 dígitos numéricos." })
  cpf: string;

  @IsOptional()
  @IsBoolean()
  isHalfPrice?: boolean;
}

export class BuyTicketsRequestDTO {
  @IsArray()
  @ArrayMinSize(1, { message: "Informe pelo menos um ingresso." })
  @ValidateNested({ each: true })
  @Type(() => TicketRequestDTO)
  tickets: TicketRequestDTO[];
}
