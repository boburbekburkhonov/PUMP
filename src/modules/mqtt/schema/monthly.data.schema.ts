import Mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MonthlyDataDocument = HydratedDocument<MonthlyData>;

@Schema({ collection: 'monthly_data' })
export class MonthlyData {
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
  readonly totuleFlowMax: number;

  @Prop({
    type: Number,
    required: true,
  })
  readonly totuleFlowMin: number;

  @Prop({
    type: Number,
    required: true,
  })
  readonly totuleFlowAvg: number;

  @Prop({
    type: Number,
    required: true,
  })
  readonly positiveFlowMax: number;

  @Prop({
    type: Number,
    required: true,
  })
  readonly positiveFlowMin: number;

  @Prop({
    type: Number,
    required: true,
  })
  readonly positiveFlowAvg: number;

  @Prop({
    type: Number,
    required: true,
  })
  readonly flowRateMax: number;

  @Prop({
    type: Number,
    required: true,
  })
  readonly flowRateMin: number;

  @Prop({
    type: Number,
    required: true,
  })
  readonly flowRateAvg: number;

  @Prop({
    type: Number,
    required: true,
  })
  readonly velocityMax: number;

  @Prop({
    type: Number,
    required: true,
  })
  readonly velocityMin: number;

  @Prop({
    type: Number,
    required: true,
  })
  readonly velocityAvg: number;
}

export const monthlyDataSchema = SchemaFactory.createForClass(MonthlyData);
