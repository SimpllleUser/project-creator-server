import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    ProjectModule,
    SequelizeModule.forRoot({
      host: '0.0.0.0',
      dialect: 'sqlite',
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
      storage: './db/db.sqlite',
      models: [],
      autoLoadModels: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
