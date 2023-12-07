import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { VisitRegisterDto } from 'src/core/dtos/visit.dto';

class VisitRequestValidation implements VisitRegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  url: string;
}

export { VisitRequestValidation };
