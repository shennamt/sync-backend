import brcypt from './brcypt';
import jwt from 'jsonwebtoken';
import user from '../models/User.js'

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
    res.status(500).json({error: err.message});
  }
}