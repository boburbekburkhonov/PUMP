import Mongoose,{ HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type RoleDocument = HydratedDocument<Role>

@Schema({collection:'role'})
export class Role{

  @Prop({
    type: Mongoose.Schema.Types.ObjectId,
  })
  readonly id: String

  @Prop({
    type:String,
    required:true
  })
  readonly name: string
}

export const roleSchema = SchemaFactory.createForClass(Role)