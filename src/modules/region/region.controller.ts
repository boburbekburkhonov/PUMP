import { Body, Controller, Post, Patch, Param, Delete } from '@nestjs/common';
import { RegionService } from './region.service';
import { createDto } from './dto/create.dto';
import { Region } from './schema/region.schema';
import { updateDto } from './dto/update.dto';

@Controller('region')
export class RegionController {
  constructor(private readonly service: RegionService) {}

  @Post('create')
  createRegion(@Body() body: createDto): Promise<Region> {
    return this.service.createRegion(body);
  }

  @Patch('update/:id')
  updateRegion(
    @Param('id') id: string,
    @Body() body: updateDto,
  ): Promise<Region> {
    return this.service.updateRegion(id, body);
  }

  @Delete('delete/:id')
  deleteRegion(@Param('id') id: string): Promise<Region> {
    return this.service.deleteRegion(id);
  }
}
