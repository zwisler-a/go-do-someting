import { ApiProperty } from '@nestjs/swagger';

export class Todo {
  @ApiProperty({ required: false })
  id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
