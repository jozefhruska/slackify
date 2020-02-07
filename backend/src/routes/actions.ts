import express from 'express';

import { receive } from '../controllers/actions';
import { verifySlackSignature } from '../middleware/events';

const router = express.Router();

router.post('/', verifySlackSignature, receive);

export default router;
