import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Station, StationDocument } from './schema/station.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createDto } from './dto/create.dto';
import { updateDto } from './dto/update.dto';

@Injectable()
export class StationService {
  constructor(
    @InjectModel(Station.name, 'Station')
    private readonly stationModel: Model<StationDocument>,
  ) {}

  //! CREATE STATION
  async createStation(payload: createDto): Promise<Station> {
    const foundStation = await this.stationModel.findOne(payload);

    if (foundStation) {
      throw new HttpException('Bu station mavjud', HttpStatus.OK);
    }

    const newStation = await this.stationModel.create(payload);

    return newStation;
  }

  //! UPDATE STATION
  async updateStation(id: string, payload: updateDto): Promise<Station> {
    const foundStation = await this.stationModel.findById(id);

    if (!foundStation) {
      throw new HttpException('Bu station mavjud emas', HttpStatus.OK);
    }

    const updateStation = await this.stationModel.findByIdAndUpdate(
      { _id: id },
      payload,
    );

    if (updateStation) {
      return updateStation;
    }
  }

  //! DELETE STATION
  async deleteStation(id: string): Promise<Station> {
    const foundStation = await this.stationModel.findById(id);

    if (!foundStation) {
      throw new HttpException('Bu station mavjud emas', HttpStatus.OK);
    }

    const deleteStation = await this.stationModel.findByIdAndDelete({ _id: id });

    if (deleteStation) {
      return deleteStation;
    }
  }
}
