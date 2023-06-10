import { Controller, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { BalansOrganizationService } from './balans.organization.service';
import { createDto } from './dto/create.dto';
import { BalansOrganization } from './schema/balans.organization.schema';
import { updateDto } from './dto/update.dto';

@Controller('balans/org')
export class BalansOrganizationController {
  constructor(
    private readonly balansOrganizationService: BalansOrganizationService,
  ) {}

  @Post('create')
  createRegion(@Body() body: createDto): Promise<BalansOrganization> {
    return this.balansOrganizationService.createBalansOrganization(body);
  }

  @Patch('update/:id')
  updateRegion(
    @Param('id') id: string,
    @Body() body: updateDto,
  ): Promise<BalansOrganization> {
    return this.balansOrganizationService.updateBalansOrganization(id, body);
  }

  @Delete('delete/:id')
  deleteRegion(@Param('id') id: string): Promise<BalansOrganization> {
    return this.balansOrganizationService.deleteBalansOrganization(id);
  }
}
