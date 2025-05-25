import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Issue } from './models/issue.model';
import { User } from '../users/models/user.model';
import { CreateIssueDto } from './dto/create-issue.dto';
import { instanceToPlain } from 'class-transformer';
import { FindAllIssuesDto } from './dto/find-all-issues.dto';
import { Op } from 'sequelize';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IssuesService {
  constructor(
    @InjectModel(Issue)
    private issueModel: typeof Issue,
    @InjectModel(User)
    private userModel: typeof User,
    private configService: ConfigService,
  ) {}

  async create(createIssueDto: CreateIssueDto, createdById: number): Promise<Issue> {

    // Verify that the assigned user exists
    const assignedUser = await this.userModel.findByPk(createIssueDto.assignedToId);
    if (!assignedUser) {
      throw new NotFoundException('Assigned user not found');
    }

    // Verify that the creator exists
    const creator = await this.userModel.findByPk(createdById);
    if (!creator) {
      throw new NotFoundException('Creator not found');
    }

    const companyName = this.configService.get('COMPANY_NAME');
    
    // Get the latest issue number
    const latestIssue = await this.issueModel.findOne({
      where: {
        issueId: {
          [Op.like]: `${companyName}_ISS%`,
        },
      },
      order: [['issueId', 'DESC']],
      raw: true,
    });

    let issueNumber = 1;
    if (latestIssue) {
      const lastNumber = parseInt(latestIssue.issueId.split('_')[1].replace('ISS', ''));
      issueNumber = lastNumber + 1;
    }

    const issueId = `${companyName}_ISS${issueNumber.toString().padStart(3, '0')}`;

    const issueData = {
      ...createIssueDto,
      issueId,
      createdById,
      assignedToId: createIssueDto.assignedToId,
    };

    const issue = await this.issueModel.create(issueData);
    return this.findOne(issue.id);
  }

  async findAll(query: FindAllIssuesDto) {
    const { page = 1, limit = 10, search, status, priority, assignedToId } = query;
    const offset = (page - 1) * limit;

    const whereClause: any = {};
    
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    if (status) {
      whereClause.status = status;
    }

    if (priority) {
      whereClause.priority = priority;
    }

    if (assignedToId) {
      whereClause.assignedToId = assignedToId;
    }

    const { count, rows } = await this.issueModel.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: this.userModel,
          as: 'assignedTo',
          attributes: ['id', 'firstName', 'lastName', 'email', 'employeeId', 'designation'],
        },
        {
          model: this.userModel,
          as: 'createdBy',
          attributes: ['id', 'firstName', 'lastName', 'email', 'employeeId', 'designation'],
        },
      ],
    });

    return {
      data: rows,
      meta: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async findOne(id: number): Promise<Issue> {
    const issue = await this.issueModel.findByPk(id, {
      include: [
        {
          model: this.userModel,
          as: 'assignedTo',
          attributes: ['id', 'firstName', 'lastName', 'email', 'employeeId', 'designation'],
        },
        {
          model: this.userModel,
          as: 'createdBy',
          attributes: ['id', 'firstName', 'lastName', 'email', 'employeeId', 'designation'],
        },
      ],
    });

    if (!issue) {
      throw new NotFoundException('Issue not found');
    }

    return issue;
  }

  async update(id: number, updateIssueDto: Partial<CreateIssueDto>): Promise<Issue> {
    const issue = await this.issueModel.findByPk(id);
    if (!issue) {
      throw new NotFoundException('Issue not found');
    }

    await issue.update(updateIssueDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const issue = await this.issueModel.findByPk(id);
    if (!issue) {
      throw new NotFoundException('Issue not found');
    }
    await issue.destroy();
  }

  async findAssignedIssues(userId: number, search?: string) {
    const whereClause: any = { assignedToId: userId };
    
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const issues = await this.issueModel.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: this.userModel,
          as: 'assignedTo',
          attributes: ['id', 'firstName', 'lastName', 'email', 'employeeId', 'designation'],
        },
        {
          model: this.userModel,
          as: 'createdBy',
          attributes: ['id', 'firstName', 'lastName', 'email', 'employeeId', 'designation'],
        },
      ],
    });

    return {
      data: issues,
    };
  }
} 