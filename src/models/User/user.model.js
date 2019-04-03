import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

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

const encrypt = async (next) => {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
};

UserSchema.pre('save', next => encrypt(next));

export default mongoose.model('User', UserSchema);
