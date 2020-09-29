import { ApiProperty } from '@nestjs/swagger';

export class TodoDoneStatus {
  @ApiProperty()
  id: string;

  @ApiProperty()
  isDone: boolean;
}
