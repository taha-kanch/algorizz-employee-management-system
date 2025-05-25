import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Table
export class User extends Model {
  @ApiProperty({ example: 'EMP001' })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  employeeId: string;

  @ApiProperty({ example: 'John' })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @ApiProperty({ example: 'john@example.com' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ enum: UserRole, example: UserRole.EMPLOYEE })
  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    allowNull: false,
    defaultValue: UserRole.EMPLOYEE,
  })
  role: UserRole;

  @ApiProperty({ enum: UserStatus, example: UserStatus.ACTIVE })
  @Column({
    type: DataType.ENUM(...Object.values(UserStatus)),
    allowNull: false,
    defaultValue: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @ApiProperty({ example: '1234567890' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phoneNumber: string;

  @ApiProperty({ example: '1990-01-01' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dateOfBirth: Date;

  @ApiProperty({ example: '123 Main St' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @ApiProperty({ example: 'Software Engineer' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  designation: string;

  @ApiProperty({ example: '50000' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  salary: string;

  @ApiProperty({ example: '2023-01-01' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  joiningDate: Date;
} 