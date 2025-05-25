import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { IssueStatus, IssuePriority } from '../models/issue.model';

export class FindAllIssuesDto {
  @ApiProperty({ required: false, example: 1 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiProperty({ required: false, example: 10 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiProperty({ required: false, example: 'bug' })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty({ required: false, enum: IssueStatus })
  @IsEnum(IssueStatus)
  @IsOptional()
  status?: IssueStatus;

  @ApiProperty({ required: false, enum: IssuePriority })
  @IsEnum(IssuePriority)
  @IsOptional()
  priority?: IssuePriority;

  @ApiProperty({ required: false, example: 1 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  assignedToId?: number;
} 