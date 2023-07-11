import Mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DistrictDocument = HydratedDocument<District>;

@Schema({ collection: 'district' })
export class District {
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

  @Prop({
    type: Number,
    required: true,
  })
  readonly region: number;
}

export const districtSchema = SchemaFactory.createForClass(District);
