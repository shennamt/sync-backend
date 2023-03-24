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
  occupation: String,
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