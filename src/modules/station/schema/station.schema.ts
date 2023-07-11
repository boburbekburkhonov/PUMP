import Mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type StationDocument = HydratedDocument<Station>;

@Schema({ collection: 'station' })
export class Station {
  @Prop({
    type: Mongoose.Schema.Types.ObjectId,
  })
  readonly id: String;

  @Prop({
    type: String,
    required: true,
  })
  readonly name: string;

  @Prop({
    type: String,
    required: true,
  })
  readonly topic: string;

  @Prop({
    type: String,
    required: true,
  })
  readonly lat: string;

  @Prop({
    type: String,
    required: true,
  })
  readonly lon: string;

  @Prop({
    type: String,
    required: true,
  })
  readonly simkarta: string;

  @Prop({
    type: Number,
    required: true,
  })
  readonly region: Number;

  @Prop({
    type: Number,
    required: true,
  })
  readonly district: Number;

  @Prop({
    type: Number,
    required: true,
  })
  readonly balansOrganization: Number;
}

export const stationSchema = SchemaFactory.createForClass(Station);
