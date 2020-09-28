import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Todo } from 'src/dto/todo.dto';
import { TodoService } from './todo.service';

@ApiTags('Todo')
@Controller('api/todos')
export class TodosController {
  constructor(private todoService: TodoService) {}

  @Get('random')
  @ApiOperation({ description: `Returns a random Todo available in the list` })
  @ApiResponse({ type: Todo })
  getRandomTodo() {
    return this.todoService.getRandom();
  }

  @Post('add')
  @ApiOperation({ description: `Add a new todo to the available pool` })
  createTodo(@Body() todo: Todo) {
    return this.todoService.add(todo);
  }

  @Get()
  getList() {
    return this.todoService.todos;
  }

  @Get(':id')
  getTodo(@Param('id') id: string) {
    return this.todoService.getTodo(id);
  }

  @Post('update')
  updateTodo(@Body() todo: Todo) {
    return this.todoService.updateTodo(todo);
  }

  @Delete('delete/:id')
  deleteToDo(@Param('id') id: string) {
    this.todoService.delete(id);
    return { success: true };
  }
}
