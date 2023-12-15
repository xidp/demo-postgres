import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './schemas/todo.schema';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/createTodo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  getAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  create(dto: CreateTodoDto): Promise<Todo> {
    const newTodo = {
      name: dto.name,
      description: dto.description,
      createdAt: new Date().toISOString(),
    };

    return this.todoRepository.save(newTodo);
  }
}
