import { CreateTodoDTO } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface CreateTodoUseCase {
  execute: (todo: CreateTodoDTO) => Promise<TodoEntity>;
}

export class CreateTodoUseCaseImpl implements CreateTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  public async execute(todo: CreateTodoDTO): Promise<TodoEntity> {
    return await this.todoRepository.createTodo(todo);
  }
}
