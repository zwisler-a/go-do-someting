import { Injectable } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { readFileSync } from 'fs';
import { Todo } from 'src/dto/todo.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodoService {
  readonly FILE_PATH = 'db.json';

  todos: any[];

  constructor() {
    this.loadDb();
  }

  getRandom() {
    return this.todos[Math.floor(Math.random() * this.todos.length)];
  }

  getTodo(id: string) {
    return this.todos.find(todo => todo.id === id);
  }

  add(todo: Todo) {
    todo.id = uuidv4();
    this.todos.push(todo);
    this.storeDb();
    return todo;
  }

  updateTodo(todo: Todo) {
    if (!todo.id) throw new Error('');
    this.todos = this.todos.map(stodo => (stodo.id === todo.id ? todo : stodo));
    this.storeDb();
    return todo;
  }

  delete(id: string) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.storeDb();
  }

  private loadDb() {
    try {
      this.todos = JSON.parse(readFileSync(this.FILE_PATH).toString());
    } catch (e) {
      this.todos = [];
    }
  }

  private storeDb() {
    writeFileSync(this.FILE_PATH, JSON.stringify(this.todos));
  }
}
