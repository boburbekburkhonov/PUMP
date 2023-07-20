import {
  Controller,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Get,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { BalansOrganizationService } from './balans.organization.service';
import { createDto } from './dto/create.dto';
import { BalansOrganization } from './schema/balans.organization.schema';
import { updateDto } from './dto/update.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from '../auth/guard/jwt.guard';

@Controller('balans/org')
export class BalansOrganizationController {
  constructor(
    private readonly balansOrganizationService: BalansOrganizationService,
  ) {}

  @Get('get/:id')
  getBalansOrganizationById(
    @Param('id') id: string,
  ): Promise<BalansOrganization> {
    return this.balansOrganizationService.getBalansOrganizationById(id);
  }

  @Get('get')
  getBalansOrganization(): Promise<BalansOrganization> {
    return this.balansOrganizationService.getBalansOrganization();
  }

  @Post('create')
  createBalansOrganization(
    @Body() body: createDto,
  ): Promise<BalansOrganization> {
    return this.balansOrganizationService.createBalansOrganization(body);
  }

  // !Create many
  @UseGuards(JwtGuard)
  @Post('create/many')
  @UseInterceptors(FilesInterceptor('file'))
  createManyBalansOrganization(@UploadedFiles() file) {
    return this.balansOrganizationService.createManyBalansOrganization(file);
  }

  @Patch('update/:id')
  updateBalansOrganization(
    @Param('id') id: string,
    @Body() body: updateDto,
  ): Promise<BalansOrganization> {
    return this.balansOrganizationService.updateBalansOrganization(id, body);
  }

  @Delete('delete/:id')
  deleteBalansOrganization(
    @Param('id') id: string,
  ): Promise<BalansOrganization> {
    return this.balansOrganizationService.deleteBalansOrganization(id);
  }
}
