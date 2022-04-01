import { rest } from 'msw';

let todos: Todo[] = [];
let id = 0;

export const handler = [
  rest.get('/todos', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todos));
  }),
  rest.post<Pick<Todo, 'text'>>('/todos', (req, res, ctx) => {
    const { text } = req.body;
    const newTodo: Todo = {
      id: id++,
      text,
      done: false,
    };
    todos = [...todos, newTodo];
    return res(ctx.status(204));
  }),
  rest.delete('/todos/:id', (req, res, ctx) => {
    const { id } = req.params;

    todos = todos.filter((todo) => todo.id !== Number(id));

    return res(ctx.status(204));
  }),
  rest.patch<Pick<Todo, 'done'>>('/todos/:id', (req, res, ctx) => {
    const { id } = req.params;

    const { done } = req.body;

    todos = todos.map((todo) =>
      todo.id === Number(id) ? { ...todo, done } : todo
    );

    return res(ctx.status(204));
  }),
];
