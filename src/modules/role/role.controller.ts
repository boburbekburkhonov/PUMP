import { Body, Controller, Get, Post, UseGuards,Req,Put,Param,Delete } from "@nestjs/common";
import { RoleService } from "./role.service";
import { roleDto } from "./dto/create.dto";
import { JwtGuard } from "../auth/guard/jwt.guard";
import { updateDto } from './dto/update.dto';
import { Role } from './schemas/role.schema';

@Controller('role')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  // ! read roles -------
  @UseGuards(JwtGuard)
  @Get('read')
  readRole(): Promise<Role> {
    return this.service.readRole();
  }

  // ! create role -------
  @UseGuards(JwtGuard)
  @Post('create')
  createRole(@Body() body: roleDto): Promise<Role> {
    return this.service.createRole(body);
  }

  //! Update ----
  @UseGuards(JwtGuard)
  @Put('update/:id')
  updateRole(@Body() name: updateDto, @Param('id') id: string) {
    return this.service.updateRole(name, id);
  }

  // ! Delete ----
  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  deleteRole(@Param('id') id: string) {
    return this.service.deleteRole(id);
  }
}