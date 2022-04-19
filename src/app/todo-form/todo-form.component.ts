import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'todo-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent {
  todoForm = new FormGroup({
    todo: new FormControl('', [Validators.required]),
  });

  @Output() todoSubmitted = new EventEmitter<string>();

  onSubmit() {
    this.todoForm.markAsDirty();
    if (this.todoForm.valid) {
      this.todoSubmitted.emit(this.todoForm.value.todo);
      this.todoForm.reset();
    }
  }

  get todo() {
    return this.todoForm.get('todo');
  }
}
