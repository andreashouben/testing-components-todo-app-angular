import { TodoService } from './todo.service';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import MockedObject = jest.MockedObject;

jest.mock('@angular/common/http');

const expectedTodos: Todo[] = [
  {
    id: 1,
    text: 'learn angular',
    done: false,
  },
  {
    id: 2,
    text: 'learn testing',
    done: false,
  },
];

describe('TodoServiceJest', () => {
  const setup = () => {
    const httpMock = jest.mocked(new HttpClient(null as any));
    const todoService = new TodoService(httpMock as any);
    return { httpMock, todoService };
  };

  it('should be created', () => {
    const { todoService } = setup();
    expect(todoService).toBeTruthy();
  });

  it('should return the todos delivered by the backend', async () => {
    const { httpMock, todoService } = setup();

    const expectedTodos: Todo[] = [
      {
        id: 1,
        text: 'learn angular',
        done: false,
      },
      {
        id: 2,
        text: 'learn testing',
        done: false,
      },
    ];

    httpMock.get.mockReturnValue(of(expectedTodos));

    await todoService.getTodos().subscribe({
      next: (todos) => expect(todos).toEqual(expectedTodos),
    });
    expect(httpMock.get).toHaveBeenCalledWith('/todos');
  });

  it('should call the markDone endpoint, when the markTodoAsDone method is called', () => {
    const { httpMock, todoService } = setup();

    todoService.markTodoAsDone(1);

    expect(httpMock.patch).toHaveBeenCalledWith('/todos/1', {
      done: true,
    });
  });

  it('should call the markUndone endpoint, when the markTodoAsUndone method is called', () => {
    const { httpMock, todoService } = setup();

    todoService.markTodoAsUndone(1);

    expect(httpMock.patch).toHaveBeenCalledWith('/todos/1', {
      done: false,
    });
  });

  it('should call the delete endpoint when the delete method is called', () => {
    const { httpMock, todoService } = setup();

    todoService.deleteTodo(1);

    expect(httpMock.delete).toHaveBeenCalledWith('/todos/1');
  });
});

describe('TodoServiceTestbed', () => {
  let httpMock: MockedObject<HttpClient>;
  let todoService: TodoService;

  beforeEach(() => {
    httpMock = jest.mocked(new HttpClient(null as any));

    TestBed.configureTestingModule({
      providers: [TodoService, { provide: HttpClient, useValue: httpMock }],
    });

    todoService = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(todoService).toBeTruthy();
  });

  it('should return the todos delivered by the backend', async () => {
    httpMock.get.mockReturnValue(of(expectedTodos));

    await todoService.getTodos().subscribe({
      next: (todos) => expect(todos).toEqual(expectedTodos),
    });
    expect(httpMock.get).toHaveBeenCalledWith('/todos');
  });

  it('should call the markDone endpoint', () => {
    todoService.markTodoAsDone(1);

    expect(httpMock.patch).toHaveBeenCalledWith('/markTodoAsDone/1', {
      done: true,
    });
  });
});
