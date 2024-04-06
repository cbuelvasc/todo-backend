import { Request, Response } from "express";
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/dtos";
import { TodoRepository } from "../../domain/repositories/todo.repository";
import {
  CreateTodoUseCaseImpl,
  DeleteTodoUseCaseImpl,
  GetTodosUseCaseImpl,
  GetTodoUseCaseImpl,
  UpdateTodoUseCaseImpl,
} from "../../domain";

export class TodosController {
  
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = (req: Request, res: Response) => {
    new GetTodosUseCaseImpl(this.todoRepository)
      .execute()
      .then((todos) => {
        res.json(todos);
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;

    new GetTodoUseCaseImpl(this.todoRepository)
      .execute(id)
      .then((todo) => {
        res.json(todo);
      })
      .catch((error) => {
        res.status(404).json({ error: `TODO with id ${id} not found` });
      });
  };

  public createTodo = (req: Request, res: Response) => {
    const [error, createTodoDTO] = CreateTodoDTO.create(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    new CreateTodoUseCaseImpl(this.todoRepository)
      .execute(createTodoDTO!)
      .then((todo) => {
        res.json(todo);
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDTO] = UpdateTodoDTO.update({ ...req.body, id });

    if (error) {
      return res.status(400).json({ error });
    }

    new UpdateTodoUseCaseImpl(this.todoRepository)
      .execute(updateTodoDTO!)
      .then((todo) => {
        res.json(todo);
      })
      .catch((error) => {
        res.status(400).json({ error: `TODO with id ${id} not found` });
      });
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    new DeleteTodoUseCaseImpl(this.todoRepository)
      .execute(id)
      .then((todo) => {
        res.json(todo);
      })
      .catch((error) => {
        res.status(400).json({ error: `TODO with id ${id} not found` });
      });
  };
}
