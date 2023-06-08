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
  readonly imei: string;

  @Prop({
    type: Number,
    required: true,
  })
  readonly lat: number;

  @Prop({
    type: Number,
    required: true,
  })
  readonly lon: number;
}

export const stationSchema = SchemaFactory.createForClass(Station);
