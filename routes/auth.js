import express from 'express';
import { login } from '../controllers/auth.js';

const router = express.Router();

router.post('/login', login); // alrdy specified in index.js so no need for /auth prefix here

export default router;