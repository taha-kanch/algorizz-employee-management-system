import { IsEnum, IsOptional, IsString } from 'class-validator';
import { IssueStatus } from '../models/issue.model';

export class UpdateIssueDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(IssueStatus)
  @IsOptional()
  status?: IssueStatus;
} 