import { CreateTodoDTO } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface DeleteTodoUseCase {
  execute: (id: number) => Promise<TodoEntity>;
}

export class DeleteTodoUseCaseImpl implements DeleteTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  public async execute(id: number): Promise<TodoEntity> {
    return await this.todoRepository.deleteTodo(id);
  }
}