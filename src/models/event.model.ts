import mongoose, { Schema, Document, Types } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  organizer: string;
  participants: Types.ObjectId[]; 
}

const EventSchema: Schema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    organizer: { type: String, required: true },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student", 
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IEvent>("Event", EventSchema);
