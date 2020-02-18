import express from 'express';

import events from './events';
import actions from './actions';

const router = express.Router();

router.use('/events', events);
router.use('/actions', actions);

export default router;
