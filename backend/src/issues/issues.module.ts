import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { Issue } from './models/issue.model';
import { User } from '../users/models/user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Issue, User]),
  ],
  controllers: [IssuesController],
  providers: [IssuesService],
  exports: [IssuesService],
})
export class IssuesModule {} 