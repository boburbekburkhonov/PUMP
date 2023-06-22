import { Controller, Get, Req } from '@nestjs/common';
import { MqttService } from './mqtt.service';

@Controller('mqtt')
export class MqttController {
  constructor(private service: MqttService) {}

  @Get('present/working/devices')
  async presentWorkingDevices(@Req() request: Request): Promise<any> {
    return this.service.presentWorkingDevices(request);
  }
}
