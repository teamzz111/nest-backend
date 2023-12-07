import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Visit, VisitDocument } from 'src/schemas/visits.schema';

@Injectable()
class AnalyticsRepository {
  constructor(
    @InjectModel(Visit.name) private visitsModel: Model<VisitDocument>,
  ) {}

  async findByUrl(url: string): Promise<VisitDocument> {
    return this.visitsModel.findOne({
      url,
    });
  }

  async updateById(id: string, data: Partial<VisitDocument>) {
    return this.visitsModel.updateOne(
      {
        _id: id,
      },
      data,
    );
  }

  async create(url: string) {
    return new this.visitsModel({ url }).save();
  }

  async getAll(): Promise<VisitDocument[]> {
    return this.visitsModel.find();
  }
}

export default AnalyticsRepository;
