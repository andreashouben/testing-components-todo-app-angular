import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';
import { NgIconsModule } from '@ng-icons/core';
import { TypTrash } from '@ng-icons/typicons';
import { By } from '@angular/platform-browser';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemComponent],
      imports: [NgIconsModule.withIcons({ TypTrash })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todo = { id: 1, done: false, text: 'Do something' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the assigned todo text', () => {
    component.todo = { id: 1, done: false, text: 'buy milk' };
    fixture.detectChanges();

    const textEl = fixture.debugElement.query(
      By.css('[data-testid="todo-text"]')
    );

    expect(textEl.nativeElement.textContent).toEqual('buy milk');
  });
});
