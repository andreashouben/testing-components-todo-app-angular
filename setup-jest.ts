import 'jest-preset-angular/setup-jest';
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { clearTodos, handler } from './src/mocks/handler';

let server = setupServer(...handler);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  clearTodos();
});

afterAll(() => {
  server.close();
});
