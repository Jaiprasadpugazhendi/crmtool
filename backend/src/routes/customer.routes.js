const express = require('express');
const {
    createCustomer,
    getCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customer.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { createCustomerSchema, updateCustomerSchema } = require('../validations/customer.validation');

const router = express.Router();

router.use(protect); // All routes protected

router
    .route('/')
    .get(getCustomers)
    .post(validate(createCustomerSchema), createCustomer);

router
    .route('/:id')
    .get(getCustomer)
    .put(validate(updateCustomerSchema), updateCustomer)
    .delete(authorize('admin', 'manager'), deleteCustomer);

module.exports = router;
