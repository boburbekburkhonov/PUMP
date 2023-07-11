import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { District } from './schema/district.schema';
import { createDto } from './dto/create.dto';
import { DistrictService } from './district.service';
import { updateDto } from './dto/update.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from '../auth/guard/jwt.guard';

@Controller('district')
export class DistrictController {
  constructor(private readonly service: DistrictService) {}

  @UseGuards(JwtGuard)
  @Get('get')
  getDistrict(): Promise<District> {
    return this.service.getDistrict();
  }

  @UseGuards(JwtGuard)
  @Post('create')
  createDistrict(@Body() body: createDto): Promise<District> {
    return this.service.createDistrict(body);
  }
  // !Create many
  @UseGuards(JwtGuard)
  @Post('many')
  @UseInterceptors(FilesInterceptor('file'))
  createManyDistrict(@UploadedFiles() file) {
    return this.service.createManyDistrict(file);
  }

  @UseGuards(JwtGuard)
  @Patch('update/:id')
  updateDistrict(
    @Param('id') id: string,
    @Body() body: updateDto,
  ): Promise<District> {
    return this.service.updateDistrict(id, body);
  }

  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  deleteDistrict(@Param('id') id: string): Promise<District> {
    return this.service.deleteDistrict(id);
  }
}
