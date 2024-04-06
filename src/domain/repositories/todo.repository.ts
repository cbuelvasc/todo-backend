import { UpdateTodoDTO } from './../dtos/todos/update-todo.dto';
import { CreateTodoDTO } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoRepository {

    abstract getTodos(): Promise<TodoEntity[]>;

    abstract getTodoById(id: number): Promise<TodoEntity>;

    abstract createTodo(todo: CreateTodoDTO): Promise<TodoEntity>;

    abstract updateTodo(todo: UpdateTodoDTO): Promise<TodoEntity>;

    abstract deleteTodo(id: number): Promise<TodoEntity>;
}