import {
  Body,
  Controller,
  Post,
  Patch,
  Param,
  Delete,
  UseGuards,
  Get,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { createDto } from './dto/create.dto';
import { Region } from './schema/region.schema';
import { updateDto } from './dto/update.dto';
import { JwtGuard } from '../auth/guard/jwt.guard';

@Controller('region')
export class RegionController {
  constructor(private readonly service: RegionService) {}

  @UseGuards(JwtGuard)
  @Get('get/:id')
  getRegionById(@Param('id') id: string): Promise<Region> {
    return this.service.getRegionById(id);
  }

  @UseGuards(JwtGuard)
  @Get('get')
  getRegion(): Promise<Region> {
    return this.service.getRegion();
  }

  @UseGuards(JwtGuard)
  @Post('create')
  createRegion(@Body() body: createDto): Promise<Region> {
    return this.service.createRegion(body);
  }

  @UseGuards(JwtGuard)
  @Patch('update/:id')
  updateRegion(
    @Param('id') id: string,
    @Body() body: updateDto,
  ): Promise<Region> {
    return this.service.updateRegion(id, body);
  }

  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  deleteRegion(@Param('id') id: string): Promise<Region> {
    return this.service.deleteRegion(id);
  }
}
