import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Region, RegionDocument } from './schema/region.schema';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region.name, 'Region')
    private readonly regionModel: Model<RegionDocument>,
  ) {}
}
