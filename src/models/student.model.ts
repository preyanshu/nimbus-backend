import mongoose, { Schema, Document } from "mongoose";

interface Student extends Document {
  name: string;
  email: string;
  password: string;
  place?: string;
  accommodationDays?: number;
}

const StudentSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  place: { type: String },
  accommodationDays: { type: Number },
});

export default mongoose.model<Student>("Student", StudentSchema);
