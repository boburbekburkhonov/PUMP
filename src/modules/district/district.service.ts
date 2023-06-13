import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { District, DistrictDocument } from './schema/district.schema';
import { InjectModel } from '@nestjs/mongoose';
import { createDto } from './dto/create.dto';
import { updateDto } from './dto/update.dto';
import { writeFile, writeFileSync } from 'fs';
import * as fs from 'fs';
import * as path from 'path';
import { ParseFileOptions } from '@nestjs/common';


@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District.name, 'District')
    private readonly districtModel: Model<DistrictDocument>,
  ) {}

  //! GET DISTRICT
  async getDistrict(): Promise<District> {
    const foundDistrict: any = await this.districtModel
      .find()
      .populate('region');
    return foundDistrict;
  }

  //! CREATE MORE DISTRICT
  async createManyDistrict(upload:any){  
    const [file] = upload
    
    const write = JSON.parse(file.buffer)

    console.log(write);
    
    write.map(e => this.districtModel.create({idNumber: e.id ,name: e.tum_nomi, region: e.vil_id}))
    

    return 'Created'
    
  }

  //! CREATE DISTRICT
  async createDistrict(payload: createDto): Promise<District> {
    const foundDistrict = await this.districtModel.findOne(payload);

    if (foundDistrict) {
      throw new HttpException('Bu district mavjud', HttpStatus.OK);
    }

    const newDistrict = await this.districtModel.create(payload);

    return newDistrict;
  }

  

  //! UPDATE DISTRICT
  async updateDistrict(id: string, payload: updateDto): Promise<District> {
    const foundDistrict = await this.districtModel.findById(id);

    if (!foundDistrict) {
      throw new HttpException('Bu district mavjud emas', HttpStatus.OK);
    }

    const updateDistrict = await this.districtModel.findByIdAndUpdate(
      { _id: id },
      payload,
    );

    if (updateDistrict) {
      return updateDistrict;
    }
  }

  //! DELETE REGION
  async deleteDistrict(id: string): Promise<District> {
    const foundDistrict = await this.districtModel.findById(id);

    if (!foundDistrict) {
      throw new HttpException('Bu district mavjud emas', HttpStatus.OK);
    }

    const deleteDistrict = await this.districtModel.findByIdAndDelete({
      _id: id,
    });

    if (deleteDistrict) {
      return deleteDistrict;
    }
  }
}
