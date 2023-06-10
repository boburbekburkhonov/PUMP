import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { District } from './schema/district.schema';
import { createDto } from './dto/create.dto';
import { DistrictService } from './district.service';
import { updateDto } from './dto/update.dto';

@Controller('district')
export class DistrictController {
  constructor(private readonly service: DistrictService) {}

  @Get('get')
  getDistrict(): Promise<District> {
    return this.service.getDistrict();
  }

  @Post('create')
  createDistrict(@Body() body: createDto): Promise<District> {
    return this.service.createDistrict(body);
  }

  @Patch('update/:id')
  updateDistrict(
    @Param('id') id: string,
    @Body() body: updateDto,
  ): Promise<District> {
    return this.service.updateDistrict(id, body);
  }

  @Delete('delete/:id')
  deleteDistrict(@Param('id') id: string): Promise<District> {
    return this.service.deleteDistrict(id);
  }
}
