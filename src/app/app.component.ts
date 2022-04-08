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

  get todo() {
    return this.todoForm.get('todo');
  }

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService
  ) {}

  onSubmit() {
    this.todoForm.markAsDirty();
    if (this.todoForm.valid) {
      this.todoService
        .createTodo(this.todoForm.value.todo)
        .subscribe(() => this.getTodos());
      this.todoForm.reset();
    }
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
