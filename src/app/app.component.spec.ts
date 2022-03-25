import { AppComponent } from './app.component';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { TypTrash } from '@ng-icons/typicons';

describe('AppComponent', () => {
  let app: AppComponent;
  beforeEach(async () => {
    const { fixture } = await render(AppComponent, {
      imports: [ReactiveFormsModule, NgIconsModule.withIcons({ TypTrash })],
    });
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should have a tilte "Your Todos for today"', () => {
    expect(screen.getByText(/your todos for today/i)).toBeVisible();
  });

  it('should show an empty todo list', async () => {
    expect(screen.getByText(/no todos/i)).toBeVisible();
  });

  it('should show a todo item after submitting a new todo', async () => {
    const input = screen.getByLabelText(/add todo/i);
    userEvent.type(input, 'Buy milk{enter}');

    expect(await screen.findByRole('listitem')).toHaveTextContent('Buy milk');
  });

  it('should hide the "no todos" text after adding a todo', () => {
    const input = screen.getByLabelText(/add todo/i);
    userEvent.type(input, 'Buy milk{enter}');

    expect(screen.queryByText(/no todos/i)).not.toBeInTheDocument();
  });

  it('should remove the todo item after clicking the remove icon', async () => {
    const input = screen.getByLabelText(/add todo/i);
    userEvent.type(input, 'Buy milk{enter}');

    const removeButton = screen.getByRole('button', { name: /remove/i });
    userEvent.click(removeButton);

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('should show an error if the todo is empty', async () => {
    const input = screen.getByLabelText(/add todo/i);
    userEvent.type(input, '{enter}');

    expect(screen.getByText(/todo is required/i)).toBeVisible();
  });
});
