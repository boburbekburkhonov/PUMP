import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { createDto } from './dto/user.stations.schema';
import { UserStationsService } from './user.stations.service';
import { JwtGuard } from '../auth/guard/jwt.guard';

@Controller('users/stations')
export class UserStationsController {
  constructor(private readonly service: UserStationsService) {}

  @UseGuards(JwtGuard)
  @Get('get')
  getAttachUserStations(@Req() request: Request): Promise<any> {
    return this.service.getAttachUserStations(request);
  }

  @Post('attach')
  register(@Body() body: createDto): Promise<string> {
    return this.service.attachUser(body);
  }
}
