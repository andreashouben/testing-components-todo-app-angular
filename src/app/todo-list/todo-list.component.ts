import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'todo-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  @Input() todos!: Todo[];

  @Output() deleteTodoEvent = new EventEmitter<Todo>();

  @Output() markTodoAsDone = new EventEmitter<number>();

  onDeleteTodo(todo: Todo) {
    this.deleteTodoEvent.emit(todo);
  }

  onMarkedDone(id: number) {
    this.markTodoAsDone.emit(id);
  }
}
