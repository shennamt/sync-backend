import express from 'express';
import {
  getUser,
  getUserProjects,
} from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// READ
router.get('/:id', verifyToken, getUser); // since we're using users as indicated in the index.js. this route is actually users/id
router.get('/:id/:project', verifyToken, getUserProjects)