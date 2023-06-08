import { Module } from '@nestjs/common';
import { DistrictController } from './district.controller';
import { DistrictService } from './district.service';
import { MongooseModule } from '@nestjs/mongoose';
import { District, districtSchema } from './schema/district.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: District.name,
          schema: districtSchema,
        },
      ],
      'District',
    ),
  ],
  controllers: [DistrictController],
  providers: [DistrictService],
})
export class DistrictModule {}
