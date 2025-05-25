import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsOptional, IsDateString, IsNumber } from 'class-validator';
import { IssuePriority, IssueStatus } from '../models/issue.model';

export class CreateIssueDto {
  @ApiProperty({ example: 'Fix login page bug' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'The login page is not working properly on mobile devices' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: IssueStatus, example: IssueStatus.TODO })
  @IsEnum(IssueStatus)
  @IsOptional()
  status?: IssueStatus;

  @ApiProperty({ enum: IssuePriority, example: IssuePriority.MEDIUM })
  @IsEnum(IssuePriority)
  @IsOptional()
  priority?: IssuePriority;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  assignedToId: number;

  @ApiProperty({ example: '2024-03-20' })
  @IsDateString()
  @IsOptional()
  dueDate?: String;
} 