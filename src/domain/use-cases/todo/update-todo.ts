import { UpdateTodoDTO } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface UpdateTodoUseCase {
  execute: (todo: UpdateTodoDTO) => Promise<TodoEntity>;
}

export class UpdateTodoUseCaseImpl implements UpdateTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  public async execute(todo: UpdateTodoDTO): Promise<TodoEntity> {
    return await this.todoRepository.updateTodo(todo);
  }
}