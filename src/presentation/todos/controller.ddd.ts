import { Request, Response } from "express";
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/dtos";
import { TodoRepository } from "../../domain/repositories/todo.repository";

export class TodosController {
  
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getTodos();
    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    try {
      const todo = await this.todoRepository.getTodoById(id);
      res.json(todo);
    } catch (error) {
      res.status(404).json({ error: `TODO with id ${id} not found` });
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDTO] = CreateTodoDTO.create(req.body);

    if (error) {
      return res.status(400).json({ error });
    }
    const todo = await this.todoRepository.createTodo(createTodoDTO!);

    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDTO] = UpdateTodoDTO.update({ ...req.body, id });

    if (error) {
      return res.status(400).json({ error });
    }

    const todoUpdated = await this.todoRepository.updateTodo(updateTodoDTO!);
    res.json(todoUpdated);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const todoDeleted = await this.todoRepository.deleteTodo(id);
    res.json(todoDeleted);
  };
}
