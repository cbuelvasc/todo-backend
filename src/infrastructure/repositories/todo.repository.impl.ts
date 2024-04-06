import {
  CreateTodoDTO,
  TodoDatasource,
  TodoEntity,
  TodoRepository,
  UpdateTodoDTO,
} from "../../domain";

export class TodoRepositoryImpl implements TodoRepository {
    
  constructor(private readonly datasource: TodoDatasource) {}

  getTodos(): Promise<TodoEntity[]> {
    return this.datasource.getTodos();
  }

  getTodoById(id: number): Promise<TodoEntity> {
    return this.datasource.getTodoById(id);
  }

  createTodo(todo: CreateTodoDTO): Promise<TodoEntity> {
    return this.datasource.createTodo(todo);
  }

  updateTodo(todo: UpdateTodoDTO): Promise<TodoEntity> {
    return this.datasource.updateTodo(todo);
  }

  deleteTodo(id: number): Promise<TodoEntity> {
    return this.datasource.deleteTodo(id);
  }
}
