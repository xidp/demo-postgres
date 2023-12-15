import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './schemas/todo.schema';
import { CreateTodoDto } from './dtos/createTodo.dto';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get()
  async getTodos(): Promise<Todo[]> {
    return await this.todoService.getAll();
  }

  @Post()
  async postTodo(@Body() dto: CreateTodoDto): Promise<Todo> {
    return await this.todoService.create(dto);
  }
}
