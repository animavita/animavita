// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const { Schema } = mongoose;

// const UserSchema = new Schema(
//   {
//     email: {
//       type: String,
//       unique: true,
//       lowercase: true,
//       required: true
//     },
//     name: {
//       type: String,
//       required: true
//     },
//     password: {
//       type: String,
//       required: false,
//       select: false
//     },
//     facebookId: {
//       type: String,
//       unique: true,
//       required: false
//     }
//   },
//   {
//     timestamps: true
//   }
// );

// UserSchema.pre('save', async function encrypt(next) {
//   const hash = await bcrypt.hash(this.password, 10);
//   this.password = hash;
//   next();
// });

// export default mongoose.model('User', UserSchema);
