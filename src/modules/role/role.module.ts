import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { Role, roleSchema } from "./schemas/role.schema";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { AuthService } from "../auth/auth.service";
import { JwtStrategy } from "../auth/strategy/jwt.strategy";
import { LocalStrategy } from "../auth/strategy/local.strategy";


@Module({
  imports:[
    MongooseModule.forFeature(
      [
        {
          name: Role.name,
          schema: roleSchema
        },
      ],
      'Role',
    ),
    PassportModule,
    JwtModule.register({
      secret: '1q2w3e4r',
    }),
  ],
  controllers:[RoleController],
  providers:[RoleService]
})
export class RoleModule{}