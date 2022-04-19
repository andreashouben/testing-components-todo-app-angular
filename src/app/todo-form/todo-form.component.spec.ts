import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFormComponent } from './todo-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TodoFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function selectElement(fixture: ComponentFixture<any>, id: string) {
    return fixture.debugElement.query(By.css(`[data-testid="${id}"]`));
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits the submitted todo', () => {
    const input = selectElement(fixture, 'todo-input');

    input.nativeElement.value = 'buy milk';
    input.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    let expectedTodo;
    component.todoSubmitted.subscribe((todo) => (expectedTodo = todo));

    selectElement(fixture, 'submit-button').nativeElement.click();
    fixture.detectChanges();

    expect(expectedTodo).toEqual('buy milk');
  });

  it('prevents an empty value from being submitted', () => {
    selectElement(fixture, 'submit-button').nativeElement.click();
    fixture.detectChanges();

    const errorMessage = selectElement(fixture, 'todo-error-message');

    expect(errorMessage.nativeElement.innerHTML).toEqual('(Todo is required)');
  });
});
