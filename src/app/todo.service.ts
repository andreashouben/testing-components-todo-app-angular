import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private httpClient: HttpClient) {}

  private readonly _url = '/todos';

  getTodos() {
    return this.httpClient.get<Todo[]>(this._url);
  }

  markTodoAsDone(id: number) {
    this.httpClient.patch<Pick<Todo, 'done'>>(`${this._url}/${id}`, {
      done: true,
    });
  }

  markTodoAsUndone(id: number) {
    this.httpClient.patch<Pick<Todo, 'done'>>(`${this._url}/${id}`, {
      done: false,
    });
  }

  deleteTodo(id: number) {
    this.httpClient.delete(`${this._url}/${id}`);
  }

  createTodo(text: string) {
    return this.httpClient.post<Pick<Todo, 'text'>>('/todos', { text });
  }
}
