import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto {
  @ApiProperty()
  description: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  categoryId: number;
}
