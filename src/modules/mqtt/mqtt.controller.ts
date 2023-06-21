import { Controller, Get } from '@nestjs/common';
import { MqttService } from './mqtt.service';

@Controller('mqtt')
export class MqttController {
  constructor(private service: MqttService) {}

  @Get('present/working/devices')
  async presentWorkingDevices(): Promise<any> {
    return this.service.presentWorkingDevices();
  }
}
