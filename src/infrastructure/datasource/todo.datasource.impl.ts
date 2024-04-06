import { CreateTodoDTO, TodoDatasource, TodoEntity, UpdateTodoDTO } from "../../domain";
import { prisma } from "../../data/postgres";

export class TodoDatasourceImpl implements TodoDatasource {

    async getTodos(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(todo => TodoEntity.fromObject(todo));
    }

    async getTodoById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({
            where: {
                id: id
            }
        });

        if (!todo) {
            throw new Error(`TODO with id ${id} not found`);
        }

        return TodoEntity.fromObject(todo);
    }

    async createTodo(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDTO!
        });
        
        return TodoEntity.fromObject(todo);
    }

    async updateTodo(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity> {
        const todo = await this.getTodoById(updateTodoDTO.id);

        const todoUpdated = await prisma.todo.update({
            where: {
                id: updateTodoDTO.id
            },
            data: updateTodoDTO!.values
        });

        return TodoEntity.fromObject(todoUpdated);
    }

    async deleteTodo(id: number): Promise<TodoEntity> {
        await this.getTodoById(id);

        const todoDeleted = await prisma.todo.delete({
            where: {
                id: id
            }
        });

        return TodoEntity.fromObject(todoDeleted);
    }
}