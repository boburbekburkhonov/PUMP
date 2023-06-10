import { Controller, Post, Patch, Param, Delete, Body } from '@nestjs/common';
import { StationService } from './station.service';
import { createDto } from './dto/create.dto';
import { Station } from './schema/station.schema';
import { updateDto } from './dto/update.dto';

@Controller('station')
export class StationController {
  constructor(private readonly service: StationService) {}

  @Post('create')
  createStation(@Body() body: createDto): Promise<Station> {
    return this.service.createStation(body);
  }

  @Patch('update/:id')
  updateStation(
    @Param('id') id: string,
    @Body() body: updateDto,
  ): Promise<Station> {
    return this.service.updateStation(id, body);
  }

  @Delete('delete/:id')
  deleteStation(@Param('id') id: string): Promise<Station> {
    return this.service.deleteStation(id);
  }
}
