import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

type Todo = {
  id: number;
  text: string;
};

@Component({
  selector: 'todo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  todos: Todo[] = [];

  todoForm = this.formBuilder.group({
    todo: ['', Validators.required],
  });
  get todo() {
    return this.todoForm.get('todo');
  }

  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
    this.todoForm.markAllAsTouched();
    if (this.todoForm.valid) {
      this.todos.push({
        id: this.todos.length + 1,
        text: this.todoForm.value.todo,
      });
      this.todoForm.reset();
    }
  }

  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter((t) => t.id !== todo.id);
  }
}
