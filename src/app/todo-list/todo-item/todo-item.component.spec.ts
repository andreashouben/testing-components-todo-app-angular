import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';
import { NgIconsModule } from '@ng-icons/core';
import { TypTrash } from '@ng-icons/typicons';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs';

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function selectElement(fixture: ComponentFixture<any>, id: string) {
    return fixture.debugElement.query(By.css(`[data-testid="${id}"]`));
  }

  it('shows the assigned todo text', () => {
    component.todo = { id: 1, done: false, text: 'buy milk' };
    fixture.detectChanges();

    const textEl = selectElement(fixture, 'todo-text');

    expect(textEl.nativeElement.textContent).toEqual('buy milk');
  });

  it('emits a mark event when marking a todo as done', () => {
    const checkboxEl = selectElement(fixture, 'check-todo');

    let selectedId;
    component.markedDone.pipe(first()).subscribe((id) => (selectedId = id));
    checkboxEl.nativeElement.click();
    fixture.detectChanges();

    expect(selectedId).toEqual(1);
  });
});
