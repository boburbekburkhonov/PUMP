import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { District, DistrictDocument } from './schema/district.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District.name, 'District')
    private readonly districtModel: Model<DistrictDocument>,
  ) {}
}
