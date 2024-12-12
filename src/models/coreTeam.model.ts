import { Schema, model, Document } from "mongoose";

interface CoreTeamMember extends Document {
  name: string;
  position: string;
  photo: string;  
}

const coreTeamMemberSchema = new Schema<CoreTeamMember>({
  name: { type: String, required: true },
  position: { type: String, required: true },
  photo: { type: String, required: true }
});

const CoreTeamMember = model<CoreTeamMember>("CoreTeamMember", coreTeamMemberSchema);

export default CoreTeamMember;
