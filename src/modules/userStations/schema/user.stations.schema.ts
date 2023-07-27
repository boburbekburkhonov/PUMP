import Mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserStationsDocument = HydratedDocument<UserStations>;

@Schema({ collection: 'user_stations' })
export class UserStations {
  @Prop({
    type: Mongoose.Schema.Types.ObjectId,
  })
  readonly id: String;

  @Prop({
    type: String,
    required: true,
  })
  readonly userId: string;

  @Prop({
    type: String,
    required: true,
  })
  readonly stationId: string;
}

export const userStationsSchema = SchemaFactory.createForClass(UserStations);
