import Mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BalansOrganizationDocument = HydratedDocument<BalansOrganization>;

@Schema({ collection: 'balans_organization' })
export class BalansOrganization {
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

export const balansOrganizationSchema =
  SchemaFactory.createForClass(BalansOrganization);
