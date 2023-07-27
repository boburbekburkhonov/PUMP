import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  UserStations,
  UserStationsDocument,
} from './schema/user.stations.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { createDto } from './dto/user.stations.schema';
import { Station, StationDocument } from '../station/schema/station.schema';
import { LastData, LastDataDocument } from '../mqtt/schema/lastdata.schema';

@Injectable()
export class UserStationsService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(UserStations.name, 'UserStations')
    private readonly userStationsModel: Model<UserStationsDocument>,
    @InjectModel(Station.name, 'Station')
    private readonly stationModel: Model<StationDocument>,
    @InjectModel(LastData.name, 'LastData')
    private readonly lastDataModel: Model<LastDataDocument>,
  ) {}

  // ! GET USER STATIONS
  async getAttachUserStations(request: any): Promise<any> {
    const { userId } = request;

    const foundUserStations: any = await this.userStationsModel.find({
      userId: userId,
    });

    const allStations = await this.stationModel.find();

    let allStationsArr: any = [];

    foundUserStations.forEach((e: any) => {
      const foundStation: any = allStations.find(
        (i: any) => i._id == e.stationId,
      );

      if (foundStation != undefined) {
        allStationsArr.push(foundStation);
      }
    });

    const allLastData = await this.lastDataModel.find();

    allStationsArr.forEach((e: any) => {
      const foundLastData = allLastData.find(
        (i) => i.stationId == e._id.toString(),
      );

      e.lastData = foundLastData;
    });

    let resultData = [];

    allStationsArr.forEach((e: any) => {
      resultData.push({
        _id: e._id,
        name: e.name,
        topic: e.topic,
        lat: e.lat,
        lon: e.lon,
        simkarta: e.simkarta,
        region: e.region,
        district: e.district,
        balansOrganization: e.balansOrganization,
        lastData: e.lastData,
      });
    });

    return resultData;
  }

  // ! CREATE USER
  async attachUser(payload: createDto): Promise<any> {
    console.log(payload);
    payload?.stationId.forEach(async (e: any) => {
      const newUserStation = await this.userStationsModel.create({
        userId: payload.userId,
        stationId: e,
      });
    });

    return {
      status: 201,
      message: 'Successful attached',
    };
  }
}
