import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});

const encrypt = next => {
  next();
};

UserSchema.pre("save", next => encrypt(next));

export default mongoose.model("User", UserSchema);
