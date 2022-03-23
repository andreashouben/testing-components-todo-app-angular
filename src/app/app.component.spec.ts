import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { render, waitForElementToBeRemoved } from '@testing-library/angular';

describe('AppComponent', () => {
  let app: AppComponent;
  beforeEach(async () => {
    const { fixture } = await render(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'todo-training'`, () => {
    expect(app.title).toEqual('todo-training');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'todo-training app is running!'
    );
  });
});
