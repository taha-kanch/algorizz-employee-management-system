import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserRole, UserStatus } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUsersDto } from './dto/find-all-users.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Op } from 'sequelize';
import { instanceToPlain } from 'class-transformer';

type CleanUser = Omit<User, 'password'>;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private configService: ConfigService,
  ) {}

  private cleanUser(user: User): CleanUser {
    const { password, ...cleanUser } = user.get({ plain: true });
    return cleanUser as CleanUser;
  }

  async create(createUserDto: CreateUserDto): Promise<CleanUser> {
    const existingUser = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const companyName = this.configService.get('COMPANY_NAME');
    
    // Get the latest employee number
    const latestEmployee = await this.userModel.findOne({
      where: {
        employeeId: {
          [Op.like]: `${companyName}_EMP%`,
        },
      },
      order: [['employeeId', 'DESC']],
      raw: true,
    });

    let employeeNumber = 1;
    if (latestEmployee) {
      const lastNumber = parseInt(latestEmployee.employeeId.split('_')[1].replace('EMP', ''));
      employeeNumber = lastNumber + 1;
    }

    const employeeId = `${companyName}_EMP${employeeNumber.toString().padStart(2, '0')}`;

    const user = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
      employeeId,
      status: UserStatus.ACTIVE,
    });

    return this.cleanUser(user);
  }

  async findAll(query: FindAllUsersDto) {
    const { page = 1, limit = 10, search } = query;
    const offset = (page - 1) * limit;

    const whereClause = {
      role: UserRole.EMPLOYEE,
      ...(search
        ? {
            [Op.or]: [
              { firstName: { [Op.iLike]: `%${search}%` } },
              { lastName: { [Op.iLike]: `%${search}%` } },
              { email: { [Op.iLike]: `%${search}%` } },
              { phoneNumber: { [Op.iLike]: `%${search}%` } },
              { designation: { [Op.iLike]: `%${search}%` } },
            ],
          }
        : {}),
    };

    const { count, rows } = await this.userModel.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      attributes: { exclude: ['password'] },
      raw: true,
    });

    const users = rows.map(user => instanceToPlain(user));

    return {
      data: users,
      meta: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async findOne(id: number): Promise<CleanUser> {
    const user = await this.userModel.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.cleanUser(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email }, raw: true });
  }

  async update(id: number, updateUserDto: Partial<CreateUserDto>): Promise<CleanUser> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await user.update(updateUserDto);
    return this.cleanUser(user);
  }

  async updateStatus(id: number, updateStatusDto: UpdateUserStatusDto): Promise<CleanUser> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await user.update({ status: updateStatusDto.status });
    return this.cleanUser(user);
  }

  async changePassword(id: number, changePasswordDto: ChangePasswordDto): Promise<CleanUser> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);
    await user.update({ password: hashedPassword });
    return this.cleanUser(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await user.destroy();
  }
} 