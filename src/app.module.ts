import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production' ? true : false, // in PRODUCTION use true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: any) => {
        return {
          type: configService.get('DB_DRIVER', 'postgres'),
          host: configService.get('DB_HOST', 'localhost'),
          port: parseInt(configService.get('DB_PORT', '5432'), 10),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          entries: [],
          autoLoadEntities: true,
          synchronize:
            configService.get('NODE_ENV') === 'production' ? false : true,
          // migrationsRun: true,
          ssl:
            configService.get('NODE_ENV') !== 'production'
              ? false
              : {
                  rejectUnauthorized: false,
                },
        };
      },
    }),
    TodosModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
