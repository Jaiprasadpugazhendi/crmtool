const express = require('express');
const {
    createDeal,
    getDeals,
    getDeal,
    updateDeal,
    deleteDeal
} = require('../controllers/deal.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { createDealSchema, updateDealSchema } = require('../validations/deal.validation');

const router = express.Router();

router.use(protect);

router
    .route('/')
    .get(getDeals)
    .post(validate(createDealSchema), createDeal);

router
    .route('/:id')
    .get(getDeal)
    .put(validate(updateDealSchema), updateDeal)
    .delete(authorize('admin', 'manager'), deleteDeal);

module.exports = router;
