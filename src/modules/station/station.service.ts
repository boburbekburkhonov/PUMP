import { Injectable } from '@nestjs/common';
import { Station, StationDocument } from './schema/station.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class StationService {
  constructor(
    @InjectModel(Station.name, 'Station')
    private readonly districtModel: Model<StationDocument>,
  ) {}
}
