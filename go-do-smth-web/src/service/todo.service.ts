export const TodoService = new (class {
  readonly API_BASE = '/';

  private todoCache: any[] = [];

  constructor() {}

  async fetchRandomTodo() {
    const response = await fetch(this.API_BASE + 'api/todos/random');
    return await response.json();
  }

  async fetchTodoList() {
    if (this.todoCache.length) return this.todoCache;
    const response = await fetch(this.API_BASE + 'api/todos');
    this.todoCache = await response.json();
    return this.todoCache;
  }

  async fetchTodo(id: string) {
    const response = await fetch(this.API_BASE + 'api/todos/' + id);
    return await response.json();
  }

  async deleteTodo(id: string) {
    this.todoCache = [];
    const response = await fetch(this.API_BASE + 'api/todos/delete/' + id, {
      method: 'DELETE',
    });
    return await response.json();
  }

  async updateTodo(todo: { id: string; name: string; description: string }) {
    this.todoCache = [];
    const response = await fetch(this.API_BASE + 'api/todos/update', {
      method: 'POST',
      headers: [['Content-Type', 'application/json']],
      body: JSON.stringify(todo),
    });
    return await response.json();
  }

  async addTodo(todo: { name: string; description: string }) {
    this.todoCache = [];
    const response = await fetch(this.API_BASE + 'api/todos/add', {
      method: 'POST',
      headers: [['Content-Type', 'application/json']],
      body: JSON.stringify(todo),
    });
    return await response.json();
  }
})();
