import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ImportType, JobState } from '../../common/enums/state.enum';

@Schema()
export class ImportJob extends Document {
  @Prop({ required: true })
  bookId: string;

  @Prop({ required: true, enum: ImportType })
  type: string;

  @Prop({ required: true })
  url: string;

  @Prop({ default: JobState.Pending })
  state: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop()
  updated_at?: Date;
}

export const ImportSchema = SchemaFactory.createForClass(ImportJob);
