import Mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type RegionDocument = HydratedDocument<Region>;

@Schema({ collection: 'region' })
export class Region {
  @Prop({
    type: Mongoose.Schema.Types.ObjectId,
  })
  readonly id: String;

  @Prop({
    type: Number,
    required: true,
  })
  readonly idNumber: number;

  @Prop({
    type: String,
    required: true,
  })
  readonly name: string;
}

export const regionSchema = SchemaFactory.createForClass(Region);
