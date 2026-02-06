const express = require('express');
const { getLogs } = require('../controllers/activityLog.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/', getLogs);

module.exports = router;
