import { Module } from '@nestjs/common';
import { BalansOrganizationController } from './balans.organization.controller';
import { BalansOrganizationService } from './balans.organization.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BalansOrganization,
  balansOrganizationSchema,
} from './schema/balans.organization.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: BalansOrganization.name,
          schema: balansOrganizationSchema,
        },
      ],
      'BalansOrganization',
    ),
  ],
  controllers: [BalansOrganizationController],
  providers: [BalansOrganizationService],
})
export class BalansOrganizationModule {}
