import { TodoService } from './todo.service';
import { HttpClient } from '@angular/common/http';
import MockedObject = jest.MockedObject;
import { TestBed } from '@angular/core/testing';

jest.mock('@angular/common/http');

describe('TodoServiceJest', () => {
  const setup = () => {
    const httpMock = jest.mocked(HttpClient);
    const todoService = new TodoService(httpMock as any);
    return { httpMock, todoService };
  };

  it('should be created', () => {
    const { todoService } = setup();
    expect(todoService).toBeTruthy();
  });
});

describe('TodoServiceTestbed', () => {
  let httpMock: MockedObject<typeof HttpClient>;
  let todoService: TodoService;

  beforeEach(() => {
    httpMock = jest.mocked(HttpClient);

    TestBed.configureTestingModule({
      providers: [TodoService, { provide: HttpClient, useValue: httpMock }],
    });

    todoService = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(todoService).toBeTruthy();
  });
});
