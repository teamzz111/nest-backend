import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorators';
import { AnalyticsService } from 'src/services/analytics/analytics.service';
import { ROLES } from 'src/utils/constants';
import { VisitRequestValidation } from 'src/utils/validations/user.val';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private analytics: AnalyticsService) {}

  @Post('register')
  async registerVisit(@Body() visitRequestDto: VisitRequestValidation) {
    return this.analytics.processVisit(visitRequestDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Roles(ROLES.ADMIN)
  @Get('getAllVisits')
  async getAllVisit() {
    return this.analytics.getAllVisits();
  }
}
