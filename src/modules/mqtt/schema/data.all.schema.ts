import Mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DataAllDocument = HydratedDocument<DataAll>;

@Schema({ collection: 'data_all' })
export class DataAll {
  @Prop({
    type: Mongoose.Schema.Types.ObjectId,
  })
  readonly id: String;

  @Prop({
    type: Mongoose.Schema.Types.ObjectId,
  })
  readonly stationId: String;

  @Prop({
    type: Mongoose.Schema.Types.Date,
  })
  readonly time: Date;

  @Prop({
    type: Number,
    required: true,
  })
  readonly totuleFlow: number;

  @Prop({
    type: Number,
    required: true,
  })
  readonly positiveFlow: number;

  @Prop({
    type: Number,
    required: true,
  })
  readonly flowRate: number;

  @Prop({
    type: Number,
    required: true,
  })
  readonly velocity: number;

  @Prop({
    type: Boolean,
    required: true,
  })
  readonly isWrite: boolean;
}

export const dataAllSchema = SchemaFactory.createForClass(DataAll);
