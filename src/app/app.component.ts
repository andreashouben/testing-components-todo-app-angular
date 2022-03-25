import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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
    todo: '',
  });

  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
    this.todos.push({
      id: this.todos.length + 1,
      text: this.todoForm.value.todo,
    });
  }
}
