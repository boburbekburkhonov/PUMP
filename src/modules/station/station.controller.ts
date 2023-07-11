import {
  Controller,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Get,
} from '@nestjs/common';
import { StationService } from './station.service';
import { createDto } from './dto/create.dto';
import { Station } from './schema/station.schema';
import { updateDto } from './dto/update.dto';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('station')
export class StationController {
  constructor(private readonly service: StationService) {}

  @Get('get')
  getStation(): Promise<any> {
    return this.service.getStation();
  }

  @UseGuards(JwtGuard)
  @Post('create')
  createStation(@Body() body: createDto): Promise<Station> {
    return this.service.createStation(body);
  }

  @UseGuards(JwtGuard)
  @Post('many')
  @UseInterceptors(FilesInterceptor('file'))
  createManyDistrict(@UploadedFiles() file) {
    return this.service.createManyStation(file);
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
