const express = require('express');
const {
    createLead,
    getLeads,
    getLead,
    updateLead,
    deleteLead,
    convertLead
} = require('../controllers/lead.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { createLeadSchema, updateLeadSchema } = require('../validations/lead.validation');

const router = express.Router();

router.use(protect);

router
    .route('/')
    .get(getLeads)
    .post(validate(createLeadSchema), createLead);

router
    .route('/:id')
    .get(getLead)
    .put(validate(updateLeadSchema), updateLead)
    .delete(authorize('admin', 'manager'), deleteLead);

router.post('/:id/convert', convertLead);

module.exports = router;
