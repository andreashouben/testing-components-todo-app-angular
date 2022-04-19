import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'todo-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todo!: Todo;

  @Output() deleteTodoEvent = new EventEmitter<Todo>();

  onDeleteClick(todo: Todo) {
    this.deleteTodoEvent.emit(todo);
  }
}
