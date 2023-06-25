import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Station, StationDocument } from './schema/station.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createDto } from './dto/create.dto';
import { updateDto } from './dto/update.dto';
import xlsx from 'node-xlsx'

@Injectable()
export class StationService {
  constructor(
    @InjectModel(Station.name, 'Station')
    private readonly stationModel: Model<StationDocument>,
  ) {}

  async getStation(): Promise<Station>{
    const allStation: any = await this.stationModel.find()

    return allStation
  }

  //! CREATE STATION
  async createStation(payload: createDto): Promise<Station> {
    const foundStation = await this.stationModel.findOne(payload);

    if (foundStation) {
      throw new HttpException('Bu station mavjud', HttpStatus.OK);
    }

    const newStation = await this.stationModel.create(payload);

    return newStation;
  }


  //! CREATE STATION
  async createManyStation(upload){

    const [file] = upload

    const [excel] = xlsx.parse(file.buffer);

    const data = excel.data.filter((e,i)=> i !== 0)


    // "id","name","region","district","company","balans_tash","code","status","protocol","lat","lon","simkart","successres","errorres","made","created_at"
    data.map(e => this.stationModel.create({name: e[1], topic: e[6], lat:e[9] ? e[9] : ' ' , lon: e[10] ? e[10] : ' ' , simkarta: e[11] ? e[11] : ' ', region:e[2], district:e[3], balansOrganization:e[5]}))


    return 'created'
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
