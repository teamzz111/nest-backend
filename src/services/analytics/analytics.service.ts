import { Injectable } from '@nestjs/common';
import { VisitRegisterDto } from 'src/core/dtos/visit.dto';
import AnalyticsRepository from 'src/repositories/analytics.repository';

@Injectable()
export class AnalyticsService {
  constructor(private analyticsRepository: AnalyticsRepository) {}

  async processVisit(data: VisitRegisterDto) {
    const exists = await this.analyticsRepository.findByUrl(data.url);

    if (exists) {
      let visits = exists.count;
      visits += 1;

      await this.analyticsRepository.updateById(exists._id, { count: visits });
    } else {
      await this.analyticsRepository.create(data.url);
    }
  }

  async getAllVisits() {
    return this.analyticsRepository.getAll();
  }
}
