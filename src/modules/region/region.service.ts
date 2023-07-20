import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Region, RegionDocument } from './schema/region.schema';
import { createDto } from './dto/create.dto';
import { updateDto } from './dto/update.dto';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region.name, 'Region')
    private readonly regionModel: Model<RegionDocument>,
  ) {}

  //! GET REGION
  async getRegionById(id: string): Promise<Region> {
    const oneRegion: any = await this.regionModel.findOne({_id: id});

    return oneRegion;
  }

  //! GET REGION
  async getRegion(): Promise<Region> {
    const allRegion: any = await this.regionModel.find();

    return allRegion;
  }

  //! CREATE REGION
  async createRegion(payload: createDto): Promise<Region> {
    const foundRegion = await this.regionModel.findOne(payload);

    if (foundRegion) {
      throw new HttpException('Bu region mavjud', HttpStatus.OK);
    }

    const newRegion = await this.regionModel.create(payload);

    return newRegion;
  }

  //! UPDATE REGION
  async updateRegion(id: string, payload: updateDto): Promise<Region> {
    const foundRegion = await this.regionModel.findById(id);

    if (!foundRegion) {
      throw new HttpException('Bu region mavjud emas', HttpStatus.OK);
    }

    const updateRegion = await this.regionModel.findByIdAndUpdate(
      { _id: id },
      payload,
    );

    if (updateRegion) {
      return updateRegion;
    }
  }

  //! DELETE REGION
  async deleteRegion(id: string): Promise<Region> {
    const foundRegion = await this.regionModel.findById(id);

    if (!foundRegion) {
      throw new HttpException('Bu region mavjud emas', HttpStatus.OK);
    }

    const deleteRegion = await this.regionModel.findByIdAndDelete({ _id: id });

    if (deleteRegion) {
      return deleteRegion;
    }
  }
}
