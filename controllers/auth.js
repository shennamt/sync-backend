import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'

// REGISTER USER
export const register = async (req, res) => { // needs to be async cos calling mongodb. req body from frontend. response to frontend.
  try {
    const {
      firstName,
      lastName,
      occupation,
      email,
      password,
    } = req.body;

    const salt = await brcypt.genSalt(); // salt will encrypt the password
    const passwordHash = await brcypt.hash(password, salt);

    const newUser = new User ({
      firstName,
      lastName,
      occupation,
      email,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// logging in
export const login = async (req, res) => {
  try {
    const { email, password } = req.body; // grabbing email and password when user tries to login
    const user = await User.findOne({ email: email }); // mongoose will find the one with the email and bring back the info
    if (!user) return res.status(400).json({ msg: "User does not exist."}); // if user doesnt exist.

    const isMatch = await bcrypt.compare(password, user.password); // gonna use the same salt to compare if same hash
    if (!isMatch) return res.status(400).json({ msg: "Invalid password."});

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password; // so it doesnt get sent back to the client
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};