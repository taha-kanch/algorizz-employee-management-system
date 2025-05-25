import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Request } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { FindAllIssuesDto } from './dto/find-all-issues.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/models/user.model';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('issues')
@Controller('issues')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new issue' })
  @ApiResponse({ status: 201, description: 'Issue successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() createIssueDto: CreateIssueDto, @Request() req) {
    console.log('Creating issue with data:', {
      ...createIssueDto,
      createdById: req.user.id,
    });
    
    const issue = await this.issuesService.create(createIssueDto, req.user.id);
    return {
      statusCode: 201,
      message: 'Issue created successfully',
      data: issue,
    };
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all issues with pagination and filters' })
  @ApiResponse({ status: 200, description: 'Return all issues with pagination metadata.' })
  async findAll(@Query() query: FindAllIssuesDto) {
    const result = await this.issuesService.findAll(query);
    return {
      statusCode: 200,
      ...result,
    };
  }

  @Get('assigned')
  @Roles(UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get issues assigned to the current user' })
  @ApiResponse({ status: 200, description: 'Return assigned issues.' })
  @ApiQuery({ name: 'search', required: false, type: String })
  async findAssigned(@Request() req, @Query('search') search?: string) {
    const result = await this.issuesService.findAssignedIssues(req.user.id, search);
    return {
      statusCode: 200,
      ...result,
    };
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get an issue by id' })
  @ApiResponse({ status: 200, description: 'Return the issue.' })
  @ApiResponse({ status: 404, description: 'Issue not found.' })
  async findOne(@Param('id') id: string) {
    const issue = await this.issuesService.findOne(+id);
    return {
      statusCode: 200,
      data: issue,
    };
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update an issue' })
  @ApiResponse({ status: 200, description: 'Issue successfully updated.' })
  @ApiResponse({ status: 404, description: 'Issue not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateIssueDto: Partial<CreateIssueDto>,
  ) {
    const issue = await this.issuesService.update(+id, updateIssueDto);
    return {
      statusCode: 200,
      message: 'Issue updated successfully',
      data: issue,
    };
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete an issue' })
  @ApiResponse({ status: 200, description: 'Issue successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Issue not found.' })
  async remove(@Param('id') id: string) {
    await this.issuesService.remove(+id);
    return {
      statusCode: 200,
      message: 'Issue deleted successfully',
    };
  }
} 