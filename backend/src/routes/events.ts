import express from 'express';

import { receive } from '../controllers/events';

const router = express.Router();

router.post('/', receive);

export default router;
