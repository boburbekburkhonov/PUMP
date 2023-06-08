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
    type: String,
    required: true,
  })
  readonly idNumber: string;

  @Prop({
    type: String,
    required: true,
  })
  readonly name: string;
}

export const districtSchema = SchemaFactory.createForClass(District);
