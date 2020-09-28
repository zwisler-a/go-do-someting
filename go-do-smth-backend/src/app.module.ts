import { Module } from '@nestjs/common';

import { TodoService } from './todos/todo.service';
import { TodosController } from './todos/todos.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'client'),
    }),
  ],
  controllers: [TodosController],
  providers: [TodoService],
})
export class AppModule {}
