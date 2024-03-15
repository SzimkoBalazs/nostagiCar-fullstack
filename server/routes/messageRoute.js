

import express from 'express';
import { createMessage, getMessagesForUser } from '../controllers/messageController.js';

const router = express.Router();

router.post('/create', createMessage);
router.get('/:userId', getMessagesForUser);

export { router as messageRoute };