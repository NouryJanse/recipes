import mongoose from 'mongoose'

const { Schema } = mongoose
mongoose.Promise = global.Promise

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  role: {
    type: String,
    default: 'Basic',
    required: true,
  },
})

export const User = mongoose.models.User || mongoose.model('User', UserSchema)
