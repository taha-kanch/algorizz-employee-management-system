import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/models/user.model';

export enum IssueStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_REVIEW = 'IN_REVIEW',
  DONE = 'DONE',
}

export enum IssuePriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

@Table
export class Issue extends Model {
  @ApiProperty({ example: 'ISS001' })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  issueId: string;

  @ApiProperty({ example: 'Fix login page bug' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({ example: 'The login page is not working properly on mobile devices' })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @ApiProperty({ enum: IssueStatus, example: IssueStatus.TODO })
  @Column({
    type: DataType.ENUM(...Object.values(IssueStatus)),
    allowNull: false,
    defaultValue: IssueStatus.TODO,
  })
  status: IssueStatus;

  @ApiProperty({ enum: IssuePriority, example: IssuePriority.MEDIUM })
  @Column({
    type: DataType.ENUM(...Object.values(IssuePriority)),
    allowNull: false,
    defaultValue: IssuePriority.MEDIUM,
  })
  priority: IssuePriority;

  @ApiProperty({ example: 1 })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  assignedToId: number;

  @BelongsTo(() => User, 'assignedToId')
  assignedTo: User;

  @ApiProperty({ example: 1 })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  createdById: number;

  @BelongsTo(() => User, 'createdById')
  createdBy: User;

  @ApiProperty({ example: '2024-03-20' })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  dueDate: Date;
} 