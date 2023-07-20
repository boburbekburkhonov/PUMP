import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  BalansOrganization,
  BalansOrganizationDocument,
} from './schema/balans.organization.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createDto } from './dto/create.dto';
import { updateDto } from './dto/update.dto';

@Injectable()
export class BalansOrganizationService {
  constructor(
    @InjectModel(BalansOrganization.name, 'BalansOrganization')
    private readonly balansOrganizationModel: Model<BalansOrganizationDocument>,
  ) {}

  //! GET BALANS ORGANIZATION ID
  async getBalansOrganizationById(id: string): Promise<BalansOrganization> {
    const foundOneOrganization: any =
      await this.balansOrganizationModel.findOne( {_id: id})

    return foundOneOrganization;
  }

  //! GET BALANS ORGANIZATION
  async getBalansOrganization(): Promise<BalansOrganization> {
    const allBalansOrganization: any =
      await this.balansOrganizationModel.find();

    return allBalansOrganization;
  }

  //! CREATE BALANS ORGANIZATION
  async createBalansOrganization(
    payload: createDto,
  ): Promise<BalansOrganization> {
    const foundBalansOrganization = await this.balansOrganizationModel.findOne(
      payload,
    );

    if (foundBalansOrganization) {
      throw new HttpException('Bu balans organization mavjud', HttpStatus.OK);
    }

    const newBalansOrganization = await this.balansOrganizationModel.create(
      payload,
    );

    return newBalansOrganization;
  }

  //! CREATE MORE BALANS ORGANIZATION
  async createManyBalansOrganization(upload: any) {
    const [file] = upload;

    const write = JSON.parse(file.buffer);

    write.map((e) =>
      this.balansOrganizationModel.create({
        idNumber: e.id,
        name: e.name,
        region: e.region_id,
      }),
    );

    return 'Created';
  }

  //! UPDATE BALANS ORGANIZATION
  async updateBalansOrganization(
    id: string,
    payload: updateDto,
  ): Promise<BalansOrganization> {
    const foundBalansOrganization = await this.balansOrganizationModel.findById(
      id,
    );

    if (!foundBalansOrganization) {
      throw new HttpException(
        'Bu balans organization mavjud emas',
        HttpStatus.OK,
      );
    }

    const updateBalansOrganization =
      await this.balansOrganizationModel.findByIdAndUpdate(
        { _id: id },
        payload,
      );

    if (updateBalansOrganization) {
      return updateBalansOrganization;
    }
  }

  //! DELETE BALANS ORGANIZATION
  async deleteBalansOrganization(id: string): Promise<BalansOrganization> {
    const foundBalansOrganization = await this.balansOrganizationModel.findById(
      id,
    );

    if (!foundBalansOrganization) {
      throw new HttpException(
        'Bu balans organization mavjud emas',
        HttpStatus.OK,
      );
    }

    const deleteBalansOrganization =
      await this.balansOrganizationModel.findByIdAndDelete({ _id: id });

    if (deleteBalansOrganization) {
      return deleteBalansOrganization;
    }
  }
}
