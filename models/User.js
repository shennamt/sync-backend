import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  occupation: String,
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    max: 5,
  },
  picturePath: {
    type: String,
    required: "",
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'project'
    },
  ],
},
  { timestamps: true }
)

const User = mongoose.model("User", userSchema);
export default User;