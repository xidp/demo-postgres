import { Controller, Get } from '@nestjs/common';

type InfoMessage = {
  project: string;
  message: string;
  dbEngine: string;
  api: any;
};

@Controller()
export class AppController {
  @Get()
  getApiInfo(): InfoMessage {
    return {
      project: 'demo-postgres',
      message: 'Status: OK',
      dbEngine: 'PostgreSQL',
      api: {
        'GET /': 'Api general infos',
        'GET /todos': 'Fetch all todos from database',
        'POST /todos': 'Saves a new todo into database',
      },
    };
  }
}
