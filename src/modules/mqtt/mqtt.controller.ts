import { Controller, Get, Param, Req } from '@nestjs/common';
import { MqttService } from './mqtt.service';

@Controller('mqtt')
export class MqttController {
  constructor(private service: MqttService) {}

  @Get('present/working/devices')
  async presentWorkingDevices(@Req() request: Request): Promise<any> {
    return this.service.presentWorkingDevices(request);
  }

  @Get('lastadata/devices/region/:id')
  async getLastDataByRegionId(@Param('id') id: number): Promise<any> {
    return this.service.getLastDataByRegionId(id);
  }
}
