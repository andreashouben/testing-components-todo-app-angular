import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TodoService } from './todo.service';

@Component({
  selector: 'todo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];

  todoForm = new FormGroup({
    todo: new FormControl('', [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService
  ) {}

  todoSubmitted(todo: string) {
    this.todoService.createTodo(todo).subscribe(() => this.getTodos());
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo.id).subscribe(() => this.getTodos());
  }

  getTodos() {
    this.todoService.getTodos().subscribe({
      next: (value) => (this.todos = value),
    });
  }

  ngOnInit(): void {
    this.getTodos();
  }
}
