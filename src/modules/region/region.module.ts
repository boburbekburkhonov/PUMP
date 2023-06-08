import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Region, regionSchema } from './schema/region.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Region.name,
          schema: regionSchema,
        },
      ],
      'Region',
    ),
  ],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}
