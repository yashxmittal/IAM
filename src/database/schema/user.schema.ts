import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type userDocument = HydratedDocument<User>;

@Schema()
export class User {

  @Prop()
  name: string;

  @Prop()
  emailId: string;

  @Prop()
  password: string;

  @Prop()
  createdAt : string;

}

export const UserSchema = SchemaFactory.createForClass(User);