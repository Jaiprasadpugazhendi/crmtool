const express = require('express');
const authRoutes = require('./auth.routes');
const leadRoutes = require('./lead.routes');
const customerRoutes = require('./customer.routes');
const dealRoutes = require('./deal.routes');
const taskRoutes = require('./task.routes');
const activityLogRoutes = require('./activityLog.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/leads', leadRoutes);
router.use('/customers', customerRoutes);
router.use('/deals', dealRoutes);
router.use('/tasks', taskRoutes);
router.use('/logs', activityLogRoutes);

module.exports = router;
