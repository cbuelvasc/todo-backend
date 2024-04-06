import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface GetTodosUseCase {
    execute: () => Promise<TodoEntity[]>;
}

export class GetTodosUseCaseImpl implements GetTodosUseCase {
    constructor(private readonly todoRepository: TodoRepository) { }

    public async execute(): Promise<TodoEntity[]> {
        return await this.todoRepository.getTodos();
    }
}